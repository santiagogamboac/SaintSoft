# Despliegue de SaintSoft

## URL actual

https://saintsoft.44.222.156.217.nip.io

`nip.io` resuelve `<lo-que-sea>.<IP>.nip.io` a esa IP. Permite tener HTTPS real (Let's Encrypt) sin dominio propio. Cuando se compre el dominio real, ver la sección "Migrar a dominio propio" al final.

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

Un solo `nginx.conf` (`/home/ubuntu/app/nginx/nginx.conf`) sirve ambos sitios con dos bloques `server{}` distintos, diferenciados por `server_name`:
- `44.222.156.217.nip.io` → CRM (backend/frontend/minio)
- `saintsoft.44.222.156.217.nip.io` → esta landing (`proxy_pass http://saintsoft:3000`)

Antes de editar `nginx.conf`: **siempre validar con `docker exec crm-nginx nginx -t`** antes de aplicar, y aplicar con `docker exec crm-nginx nginx -s reload` (recarga sin downtime, no reinicia el contenedor).

Backups guardados en el servidor antes de la primera edición:
- `/home/ubuntu/app/nginx/nginx.conf.bak-presaintsoft`
- `/home/ubuntu/app/docker-compose.yml.bak-presaintsoft`

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

## Migrar a dominio propio (pendiente)

Cuando se compre el dominio:
1. Apuntar el DNS (registro A) del dominio/subdominio a `44.222.156.217`.
2. Pedir el certificado: `docker-compose run --rm certbot certonly --webroot -w /var/www/certbot -d tudominio.com --email <email> --agree-tos --no-eff-email`
3. En `nginx.conf`, duplicar el bloque `server` de saintsoft cambiando `server_name` y las rutas de `ssl_certificate`/`ssl_certificate_key` al nuevo dominio (se puede dejar el bloque de `nip.io` o quitarlo).
4. Validar (`nginx -t`) y recargar (`nginx -s reload`).

## Si se pierde el acceso SSH (.pem)

No hay SSM Session Manager configurado por defecto en esta instancia (se intentó durante este despliegue). Si hace falta, se puede:
1. Crear un rol IAM con la policy `AmazonSSMManagedInstanceCore` y adjuntarlo a la instancia (`aws ec2 associate-iam-instance-profile`) — no requiere downtime, Ubuntu trae el agente SSM preinstalado.
2. Esperar a que el agente se registre (`aws ssm describe-instance-information`) y usar `aws ssm start-session` en vez de SSH.

## Cuenta AWS

Cuenta `904583676476`, usuario IAM usado para gestionar esto: `crm-admin` (permisos amplios, no exclusivos de este proyecto — no crear/borrar recursos fuera de lo relacionado a `saintsoft` sin confirmar).
