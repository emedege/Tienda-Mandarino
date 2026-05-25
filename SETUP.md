# Guía de configuración — Azul Mandarino

Sigue estos pasos en orden para poner en marcha la tienda. No necesitas conocimientos técnicos, ve paso a paso.

---

## PASO 1 — GitHub (repositorio del código)

1. Ve a [github.com](https://github.com) y crea una cuenta gratuita si no tienes
2. Crea un repositorio nuevo llamado `azulmandarino`
3. Sube la carpeta `web/` entera a ese repositorio

---

## PASO 2 — Sanity CMS (gestión de productos)

Este es tu panel para añadir y gestionar productos.

1. Ve a [sanity.io](https://www.sanity.io) → Crear cuenta (gratis)
2. En el dashboard, crea un nuevo proyecto:
   - Nombre: `Azul Mandarino`
   - Dataset: `production`
3. Copia tu **Project ID** (lo necesitarás más adelante)
4. Ve a **Settings → API → Tokens** → Crear token con permisos **Editor**
5. Guarda ese token (es el `SANITY_WRITE_TOKEN`)

---

## PASO 3 — Stripe (pagos)

1. Ve a [stripe.com](https://stripe.com) → Crear cuenta
2. Rellena los datos de tu negocio
3. Ve a **Developers → API Keys**:
   - Copia la **Publishable key** (`pk_live_...`)
   - Copia la **Secret key** (`sk_live_...`)
4. Ve a **Developers → Webhooks** → Añadir endpoint:
   - URL: `https://azulmandarino.com/api/webhook`
   - Evento: `checkout.session.completed`
   - Copia el **Signing secret** (`whsec_...`)

---

## PASO 4 — Resend (emails automáticos)

1. Ve a [resend.com](https://resend.com) → Crear cuenta (gratis)
2. Ve a **API Keys** → Crear API Key
3. Ve a **Domains** → Añadir tu dominio `marinadescalzi.es`
   (verificarás el dominio añadiendo unos registros DNS en Hostinger)

---

## PASO 5 — Cloudflare Pages (hosting gratis)

1. Ve a [cloudflare.com](https://cloudflare.com) → Crear cuenta
2. Ve a **Workers & Pages** → Crear proyecto → Conectar a GitHub
3. Selecciona tu repositorio `azulmandarino`
4. Configura el build:
   - **Root directory**: `web`
   - **Build command**: `npm run build`
   - **Output directory**: `.next`
   - **Framework preset**: Next.js
5. En **Environment variables**, añade todas las del paso 6

---

## PASO 6 — Variables de entorno en Cloudflare

En el panel de Cloudflare Pages → tu proyecto → Settings → Environment variables, añade:

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_URL` | `https://azulmandarino.com` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | tu Project ID de Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_WRITE_TOKEN` | tu token de escritura de Sanity |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |
| `RESEND_API_KEY` | tu API key de Resend |

---

## PASO 7 — Conectar tu dominio azulmandarino.com

1. En Cloudflare Pages → tu proyecto → Custom domains → Añadir dominio
2. Escribe `azulmandarino.com`
3. Cloudflare te dará unos **nameservers** (algo como `xxx.ns.cloudflare.com`)
4. Ve a tu cuenta de **Hostinger** → Dominios → azulmandarino.com → DNS
5. Cambia los nameservers por los de Cloudflare
6. Espera entre 10 minutos y 24 horas a que se propague

---

## PASO 8 — Añadir el logo

Guarda tu logo en: `web/public/logo.png`

Y estas imágenes de ejemplo (puedes reemplazarlas por las tuyas):
- `web/public/hero-image.jpg` — foto principal de la portada
- `web/public/about-image.jpg` — foto para la sección "Sobre mí"
- `web/public/marina-portrait.jpg` — tu foto para la página "Sobre mí"
- `web/public/og-image.jpg` — imagen para redes sociales (1200x630px)

---

## PASO 9 — Añadir tu primer producto en Sanity

Una vez desplegado, ve a `https://azulmandarino.com/studio` → introduce tus credenciales de Sanity → ¡empieza a añadir productos!

Pasos para añadir un producto:
1. Primero crea las categorías (Pendientes, Pulseras, Anillos, Collares, Broches)
2. Luego crea cada producto con sus fotos, descripción y precio

---

## Ayuda

Cualquier duda, escríbeme.
