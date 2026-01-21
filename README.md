# ASSSIE Landing Page (Astro)

Landing page estatica en Astro + TypeScript, optimizada para SEO t?cnico, performance y conversion.

## Instalacion

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - entorno local
- `npm run build` - build de produccion
- `npm run preview` - preview del build
- `npm run lint` - chequeo de tipos Astro

## Contenido editable

- Servicios: `src/content/services.ts`
- Proceso: `src/content/process.ts`
- Casos: `src/content/cases.ts`
- Planes: `src/content/plans.ts`
- FAQ: `src/content/faq.ts`
- Stack: `src/content/stack.ts`
- Marca/Contacto: `src/content/site.ts`

## SEO

- Configuracion base en `src/layouts/BaseLayout.astro`
- Helpers y schema JSON-LD en `src/lib/seo/`
- `public/robots.txt` y `public/sitemap.xml`
- OpenGraph en `public/og-image.svg`

## Formulario

- Endpoint placeholder: `src/pages/api/lead.ts`
- Validacion frontend con Zod en `src/components/sections/Contact.astro`

Para integrar con Email/CRM/WhatsApp, reemplazar el handler del endpoint o conectar un webhook.

## Performance

- Tailwind sin preflight para reducir CSS base
- Render estatico con Astro
- Imagenes optimizadas y lazy loading (cuando agregues imagenes reales)

## Deploy recomendado

- Vercel o Netlify

## Checklist SEO/Performance

- [ ] Ajustar `site.url` y datos reales en `src/content/site.ts`
- [ ] Reemplazar `public/og-image.svg` con imagen definitiva
- [ ] Completar `public/sitemap.xml` con p?ginas futuras
- [ ] Configurar dominio en `astro.config.mjs`
- [ ] Revisar titles y descriptions por p?gina
- [ ] Validar Core Web Vitals en Lighthouse
