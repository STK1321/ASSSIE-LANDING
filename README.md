# ASSSIE — sitio

Sitio de ASSSIE: herramientas de software para el trabajo real. Construimos software para el comercio que cobra por QR y para la empresa chica que vive en tres Excel. QR Libre es la primera herramienta; el trabajo a medida es lo que vendemos.

Sitio estático en Astro 4 + Tailwind 3. Sin backend, sin CMS y sin dependencias de runtime.

## Rutas

| Ruta | Qué es |
| --- | --- |
| `/` | La casa: qué construimos, hacia dónde vamos, la prueba, cómo trabajamos y el formulario de contacto. |
| `/qr-libre` | La página de QR Libre: qué va a hacer la app, sus límites, el estado del proyecto y las preguntas frecuentes. |
| `/privacidad` | Qué datos pide el formulario del sitio y cómo llegan a WhatsApp. |
| `/qr-libre/privacidad` | Qué va a leer y guardar la app QR Libre, y cómo quitarle permisos. |

## Desarrollo

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — entorno local.
- `npm run build` — build de producción en `dist/`.
- `npm run preview` — previsualización del build.
- `npm run verify` — build + verificación del `dist/` construido (el comando que debe pasar antes de publicar).
- `npm run check:site` — solo la verificación, sin rebuild.
- `npm run lint` — `astro check` (tipos y diagnósticos de Astro).

## Verificación

`npm run verify` compila y después corre `scripts/check-site.mjs`, un script de Node sin dependencias que revisa la salida construida:

- que existan las cuatro rutas;
- el canonical exacto de la home y los enlaces internos con destino;
- que `asssie.com` y las cadenas heredadas del sitio anterior no aparezcan en ninguna página ni en `llms.txt`, `robots.txt` y `sitemap.xml`;
- que no haya `[object Object]` ni `mailto:`/email en `dist/`;
- que `FAQPage` exista solo en `/qr-libre`;
- los esquemas JSON-LD (Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList), el sitemap y los enlaces de privacidad.

Para revisar tipos y diagnósticos de Astro: `npx astro check`.

## Contenido

El texto editable vive en `src/content/`:

- `site.ts` — nombre, slogan, dominio canónico, WhatsApp y dirección.
- `capabilities.ts` — los tres problemas que resuelve la casa.
- `direction.ts` — las herramientas y hacia dónde va el trabajo.
- `proof.ts` — las dos operaciones reales que usan software construido por ASSSIE.
- `process.ts` — los tres pasos de trabajo.
- `qrlibre.ts` — el contenido de QR Libre: alcance, recorrido, estado y preguntas frecuentes.

Las páginas están en `src/pages/`, los layouts en `src/layouts/`, las secciones en `src/components/sections/`, las moléculas y átomos en `src/components/`, y el SEO/JSON-LD en `src/lib/seo/`.

## Formulario

El formulario de `src/components/sections/Contact.astro` no envía nada a este sitio: compone un mensaje y abre WhatsApp para que lo revises y lo envíes tú. Sin JavaScript, el enlace de `<noscript>` abre WhatsApp con un mensaje base.

Para cambiar el número, edita `site.whatsapp` en `src/content/site.ts`.

## Documentación

- Diseño: `docs/superpowers/specs/2026-11-19-asssie-landing-redesign-design.md`
- Plan de implementación: `docs/superpowers/plans/2026-11-19-asssie-landing-redesign.md`
