# Correo profesional (@saintsoft.us) con Google Workspace

Guía para vincular el dominio `saintsoft.us` a una cuenta de Google y tener buzones reales (enviar y recibir como `nombre@saintsoft.us`, con la interfaz de Gmail).

## Estado actual (antes de este cambio)

El DNS de `saintsoft.us` vive en **Cloudflare** (no en Namecheap — ver `DEPLOY.md`). Actualmente hay registros MX de **Namecheap Email Forwarding** heredados de cuando el dominio se compró:

```
MX  saintsoft.us  eforward1.registrar-servers.com  (prioridad 10)
MX  saintsoft.us  eforward2.registrar-servers.com  (prioridad 10)
MX  saintsoft.us  eforward3.registrar-servers.com  (prioridad 10)
MX  saintsoft.us  eforward4.registrar-servers.com  (prioridad 15)
MX  saintsoft.us  eforward5.registrar-servers.com  (prioridad 20)
TXT saintsoft.us  "v=spf1 include:spf.efwd.registrar-servers.com ..."
```

Esto **solo reenvía** correo entrante a otra casilla — no permite enviar como `@saintsoft.us`. Google Workspace reemplaza esto por completo.

## Costo

Google Workspace **Business Starter**: ~US$7/mes por usuario (precio de referencia, confirmar en la página de Google al contratar). Requiere tarjeta de crédito/débito — ese paso de pago lo tiene que hacer el dueño de la cuenta directamente en Google, no se puede delegar.

Alternativa gratuita si no se necesita la interfaz de Gmail: **Cloudflare Email Routing** (solo reenvío, igual que el estado actual pero gestionado desde Cloudflare). No cubierto en detalle aquí porque no da buzón real.

## Pasos

### 1. Crear la cuenta de Google Workspace

1. Ir a https://workspace.google.com/ → "Empezar".
2. Indicar el dominio: `saintsoft.us` (opción "Ya tengo un dominio").
3. Completar datos de la empresa y crear el primer usuario admin (ej. `admin@saintsoft.us` — este usuario no existe aún, Google lo crea).
4. Elegir plan (Business Starter es el más económico) e ingresar método de pago.

### 2. Verificar la propiedad del dominio

Google pide probar que el dominio es tuyo. El método más simple con Cloudflare es un registro **TXT**:

1. En el asistente de Google Workspace, elegir "Verificar por registro TXT" (no por HTML ni Google Analytics).
2. Google entrega un valor como `google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.
3. En Cloudflare → `saintsoft.us` → DNS → Records → **Add record**:
   - Type: `TXT`
   - Name: `@` (equivale a `saintsoft.us`)
   - Content: el valor que dio Google (con las comillas si el dashboard las pide, normalmente no)
   - Proxy status: irrelevante para TXT (no aplica proxy)
   - TTL: Auto
4. Guardar y volver al asistente de Google → "Verificar". Puede tardar unos minutos en propagar.

### 3. Reemplazar los registros MX

**Eliminar** los 5 registros MX de `eforward*.registrar-servers.com` (los del reenvío de Namecheap) y el TXT de SPF viejo (`v=spf1 include:spf.efwd...`), y **agregar** los de Google:

| Type | Name | Content | Priority | Proxy |
|---|---|---|---|---|
| MX | saintsoft.us | `ASPMX.L.GOOGLE.COM` | 1 | — |
| MX | saintsoft.us | `ALT1.ASPMX.L.GOOGLE.COM` | 5 | — |
| MX | saintsoft.us | `ALT2.ASPMX.L.GOOGLE.COM` | 5 | — |
| MX | saintsoft.us | `ALT3.ASPMX.L.GOOGLE.COM` | 10 | — |
| MX | saintsoft.us | `ALT4.ASPMX.L.GOOGLE.COM` | 10 | — |

(Estos son los valores estándar de Gmail/Workspace; Google los vuelve a mostrar en el asistente por si cambian.)

**Importante:** si se quiere seguir recibiendo en la casilla personal además de tener Workspace, eso ya no se hace por MX — se configura como **reenvío dentro de Gmail/Workspace** (Configuración → Reenvío) o con una regla de reenvío por usuario. No se pueden mezclar los MX de Namecheap y los de Google al mismo tiempo.

### 4. SPF (autoriza a Google a enviar en nombre del dominio)

Agregar/editar el registro TXT de SPF en la raíz del dominio:

| Type | Name | Content |
|---|---|---|
| TXT | saintsoft.us | `v=spf1 include:_spf.google.com ~all` |

Si queda algún otro `v=spf1` en el dominio (ej. el que usa Nodemailer/Gmail para el formulario de contacto, ver `DEPLOY.md`), **no puede haber dos registros SPF separados** — hay que combinarlos en uno solo, por ejemplo:

```
v=spf1 include:_spf.google.com include:_spf.mail.yahoo.com ~all
```

(ajustar según qué servicios envían correo "como" `@saintsoft.us`; el formulario de contacto actual envía desde una cuenta de Gmail normal vía Nodemailer, no desde `@saintsoft.us`, así que probablemente no necesita estar aquí — confirmar antes de tocarlo).

### 5. DKIM (firma criptográfica anti-spoofing)

1. En el admin de Google Workspace: Apps → Google Workspace → Gmail → Autenticar correo electrónico.
2. Seleccionar el dominio `saintsoft.us` → Generar nuevo registro.
3. Google da un registro TXT tipo:
   - Name: `google._domainkey`
   - Content: `v=DKIM1; k=rsa; p=MIGfMA0GCSq...` (clave larga)
4. Agregarlo en Cloudflare como TXT con ese `Name` y `Content` exactos.
5. Volver al admin de Google y click "Iniciar autenticación" (puede tardar hasta 48h en verificar, normalmente minutos).

### 6. DMARC (política de qué hacer con correo que falla SPF/DKIM)

Recomendado, no obligatorio para que funcione, pero evita que otros suplanten `@saintsoft.us`:

| Type | Name | Content |
|---|---|---|
| TXT | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:admin@saintsoft.us` |

(`p=quarantine` manda a spam el correo que falla la validación; se puede empezar con `p=none` para solo monitorear antes de aplicar la política estricta.)

### 7. Verificar todo

- Enviar un correo de prueba a `admin@saintsoft.us` desde otra cuenta y confirmar que llega en https://mail.google.com (con la cuenta de Workspace logueada).
- Enviar un correo de prueba **desde** `admin@saintsoft.us` a una cuenta externa (Gmail personal) y revisar que no caiga en spam ni marque "no verificado" (eso confirmaría que SPF/DKIM están bien configurados).
- https://toolbox.googleapps.com/apps/checkmx/ — herramienta de Google para validar MX/SPF/DKIM del dominio.

## Resumen de cambios en Cloudflare DNS

| Acción | Registro |
|---|---|
| Eliminar | 5× MX `eforward*.registrar-servers.com` |
| Eliminar | TXT `v=spf1 include:spf.efwd.registrar-servers.com ...` (el viejo de Namecheap) |
| Agregar | TXT de verificación de Google (temporal, se puede borrar después de verificar) |
| Agregar | 5× MX de Google (`ASPMX.L.GOOGLE.COM` y `ALT1-4`) |
| Agregar | TXT SPF: `v=spf1 include:_spf.google.com ~all` |
| Agregar | TXT DKIM: `google._domainkey` con la clave que da Google |
| Agregar (opcional) | TXT DMARC: `_dmarc` |

Ninguno de estos cambios afecta el registro `A` ni el `CNAME www` que ya apuntan al servidor EC2 (`44.222.156.217`) — el correo y el sitio web son completamente independientes en DNS.
