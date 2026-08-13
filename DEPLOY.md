# Despliegue de SaintSoft

## URL actual

https://saintsoft.us (también responde `www.saintsoft.us`)

La URL antigua sigue funcionando: https://saintsoft.44.222.156.217.nip.io

`nip.io` resuelve `<lo-que-sea>.<IP>.nip.io` a esa IP. Permite tener HTTPS real (Let's Encrypt) sin dominio propio. Se dejó el bloque `nip.io` en `nginx.conf` como fallback, no hace daño mantenerlo.

## Dónde vive esto

Servidor: EC2 `crm-prod-server` (`i-007480d3e1b0d08ff`, región `us-east-1`, IP pública `44.222.156.217`), **compartido con el CRM en producción**. No es un servidor exclusivo de esta landing.

Acceso SSH:
```
ssh -i crm-prod-key.pem ubuntu@44.222.156.217
```
El `.pem` lo tiene Santiago; si se pierde, no se puede volver a descargar desde AWS — hay que regenerar acceso (ver nota al final).

Todo corre con Docker Compose desde `/home/ubuntu/app/` en el servidor:

| Servicio | Contenedor | Qué es |
|---|---|---|
| `db` | `tiviplay-db` | Postgres del CRM |
| `minio` | `tiviplay-minio` | Storage de archivos del CRM |
| `backend` | `crm-backend` | API .NET del CRM |
| `frontend` | `crm-frontend` | Frontend del CRM |
| `nginx` | `crm-nginx` | Reverse proxy — sirve TODO (CRM y landing) por los puertos 80/443 |
| `certbot` | `crm-certbot` | Certificados TLS (se corre manualmente, no automático) |
| **`saintsoft`** | `saintsoft` | **Esta landing**, Next.js standalone, puerto interno 3000 |

El código de la landing vive en `/home/ubuntu/app/saintsoft/` en el servidor (subido por `scp`, no por git — el servidor no tiene acceso al repo).

## nginx

Un solo `nginx.conf` (`/home/ubuntu/app/nginx/nginx.conf`) sirve todo con tres bloques `server{}` en el puerto 443, diferenciados por `server_name` (SNI):
- `44.222.156.217.nip.io` → CRM (backend/frontend/minio)
- `saintsoft.44.222.156.217.nip.io` → landing, URL antigua (`proxy_pass http://saintsoft:3000`)
- `saintsoft.us` / `www.saintsoft.us` → landing, dominio propio (`proxy_pass http://saintsoft:3000`)

Antes de editar `nginx.conf`: **siempre validar con `docker exec crm-nginx nginx -t`** antes de aplicar, y aplicar con `docker exec crm-nginx nginx -s reload` (recarga sin downtime, no reinicia el contenedor).

**Importante — bind mount de un solo archivo:** `docker-compose.yml` monta `./nginx/nginx.conf:/etc/nginx/nginx.conf:ro`. Si el archivo se reemplaza en el host con algo que cambie el inodo (`mv archivo_nuevo nginx.conf`, muchos editores hacen esto al guardar), el bind mount queda apuntando al inodo viejo y el contenedor no ve el cambio aunque `cat` en el host muestre el archivo correcto — ni `nginx -s reload` lo arregla, porque relee el inodo montado, no el path. Hay que **editar el archivo in-place** (ej. `cat nuevo > nginx.conf`, no `mv nuevo nginx.conf`) o, si ya se reemplazó, hacer `docker restart crm-nginx` (esto sí causa ~1-3s de corte para CRM y landing juntos, avisar antes de hacerlo en producción).

Backups guardados en el servidor antes de la primera edición:
- `/home/ubuntu/app/nginx/nginx.conf.bak-presaintsoft`
- `/home/ubuntu/app/docker-compose.yml.bak-presaintsoft`
- `/home/ubuntu/app/nginx/nginx.conf.bak-presaintsoftdomain` (antes de agregar el dominio propio)

## Secretos (envío de correo del formulario)

El formulario de contacto (`/api/contact`) envía el lead por Gmail (Nodemailer + App Password). Las credenciales están en **AWS SSM Parameter Store** (región `us-east-1`), no en el código ni en el repo:

- `/saintsoft/gmail-user` (String)
- `/saintsoft/gmail-app-password` (SecureString)
- `/saintsoft/lead-to-email` (String)

En el servidor, esas variables viven en `/home/ubuntu/app/saintsoft/.env` (permisos `600`, no está en git). Si hay que regenerarlo:

```bash
# Desde una máquina con AWS CLI configurado:
aws ssm get-parameter --name "/saintsoft/gmail-app-password" --with-decryption --region us-east-1 --query "Parameter.Value" --output text
```

Si la contraseña de aplicación de Gmail se revoca o cambia, actualizar con `aws ssm put-parameter ... --overwrite` y luego regenerar el `.env` en el servidor y hacer `docker-compose up -d --no-deps saintsoft`.

## Cómo desplegar un cambio de código

Desde la carpeta local del proyecto (sin remoto git en el servidor, se sube por `scp`):

```bash
# 1. Build local de verificación (opcional pero recomendado)
npm run build

# 2. Empaquetar y subir código (excluye node_modules/.next/.git)
tar --exclude='node_modules' --exclude='.next' --exclude='.git' -czf saintsoft-src.tar.gz saintsoft
scp -i crm-prod-key.pem saintsoft-src.tar.gz ubuntu@44.222.156.217:/home/ubuntu/

# 3. En el servidor: reemplazar código preservando el .env, rebuild y recrear el contenedor
ssh -i crm-prod-key.pem ubuntu@44.222.156.217
  cp app/saintsoft/.env /tmp/saintsoft.env.bak
  rm -rf app/saintsoft && mkdir app/saintsoft
  tar -xzf ~/saintsoft-src.tar.gz -C app/saintsoft --strip-components=1
  cp /tmp/saintsoft.env.bak app/saintsoft/.env && chmod 600 app/saintsoft/.env
  cd app && docker-compose build saintsoft && docker-compose up -d --no-deps saintsoft
```

`--no-deps` es importante: evita que Compose toque el CRM (`db`, `backend`, `frontend`, `minio`) al levantar solo `saintsoft`.

Nota: el binario correcto en este servidor es `docker-compose` (standalone v2.24.5), **no** `docker compose` (el plugin no está instalado).

## Recursos del servidor

`t3.small` (2 vCPU, 2GB RAM, ~8GB disco libre), compartido con el CRM. El contenedor `saintsoft` tiene un límite de memoria (`mem_limit: 300m` en `docker-compose.yml`) para no arriesgar al CRM; uso real en operación normal: ~30MB. El build de Docker (`npm run build` dentro del contenedor) es lo más pesado — usa swap temporalmente pero no ha causado problemas.

## Dominio propio (saintsoft.us)

Comprado en Namecheap, DNS gestionado en Cloudflare (plan Free). Namecheap solo tiene los nameservers apuntando a Cloudflare (`logan.ns.cloudflare.com`, `ulla.ns.cloudflare.com`); todo lo demás (registros DNS) se administra desde el dashboard de Cloudflare.

Registros DNS relevantes en Cloudflare:
- `A saintsoft.us → 44.222.156.217` — **proxy status: DNS only** (nube gris), a propósito.
- `CNAME www → saintsoft.us` — también DNS only.
- MX/TXT de reenvío de correo (`eforward*.registrar-servers.com`, SPF) se conservaron intactos desde Namecheap — se usan para email a `@saintsoft.us`.

**Por qué DNS only y no Proxied (nube naranja):** con el proxy de Cloudflare activado, Cloudflare termina la conexión TLS y le habla al origen (este servidor) — eso requiere poner el modo SSL/TLS de Cloudflare en "Full (strict)" para no crear un loop de redirección o servir con un certificado que Cloudflare no valide. Se dejó en DNS only para simplificar la primera puesta en marcha. Si más adelante se quiere activar el proxy (CDN, protección DDoS, WAF):
1. En Cloudflare → SSL/TLS → Overview, poner el modo en **Full (strict)**.
2. Activar el proxy (nube naranja) en los registros A y CNAME.
3. Nada cambia del lado de nginx/certbot — el certificado de Let's Encrypt sigue siendo válido para la conexión Cloudflare↔origen.

Certificado: emitido con certbot (ver comando abajo), cubre `saintsoft.us` y `www.saintsoft.us` en un solo certificado, expira 2026-11-11. **No hay renovación automática configurada** — hay que renovarlo manualmente antes de esa fecha (o configurar un cron con `docker-compose run --rm certbot renew` + reload de nginx).

```bash
# Emitir/renovar certificado (requiere que el registro A ya apunte a este servidor y el puerto 80 esté abierto)
cd /home/ubuntu/app
docker-compose run --rm certbot certonly --webroot -w /var/www/certbot -d saintsoft.us -d www.saintsoft.us --email santiagogamboacely@gmail.com --agree-tos --no-eff-email

# Validar y recargar nginx después
docker exec crm-nginx nginx -t
docker exec crm-nginx nginx -s reload
```

## Si se pierde el acceso SSH (.pem)

No hay SSM Session Manager configurado por defecto en esta instancia (se intentó durante este despliegue). Si hace falta, se puede:
1. Crear un rol IAM con la policy `AmazonSSMManagedInstanceCore` y adjuntarlo a la instancia (`aws ec2 associate-iam-instance-profile`) — no requiere downtime, Ubuntu trae el agente SSM preinstalado.
2. Esperar a que el agente se registre (`aws ssm describe-instance-information`) y usar `aws ssm start-session` en vez de SSH.

## Cuenta AWS

Cuenta `904583676476`, usuario IAM usado para gestionar esto: `crm-admin` (permisos amplios, no exclusivos de este proyecto — no crear/borrar recursos fuera de lo relacionado a `saintsoft` sin confirmar).
