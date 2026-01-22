# ASSSIE Landing Page (Astro)

Landing page para agencia de automatizacion, datos e IA. Enfocada en conversion, SEO tecnico y performance.

## Instalacion

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - entorno local
- `npm run build` - build de produccion
- `npm run preview` - previsualizacion del build
- `npm run lint` - chequeo de tipos Astro

## Arquitectura

```
src/
 ├─ pages/
 ├─ layouts/
 ├─ components/
 │   ├─ atoms/
 │   ├─ molecules/
 │   └─ sections/
 ├─ content/
 ├─ lib/seo/
 └─ styles/
public/
```

## Contenido editable

- Hero + textos base: `src/components/sections/Hero.astro`
- Servicios: `src/content/services.ts`
- Proceso: `src/content/process.ts`
- Casos tipo: `src/content/cases.ts`
- Planes: `src/content/plans.ts`
- FAQ: `src/content/faq.ts`
- Stack: `src/content/stack.ts`
- Datos de marca/contacto: `src/content/site.ts`

## SEO tecnico

- Meta tags, Open Graph y Twitter Cards: `src/layouts/BaseLayout.astro`
- JSON-LD (Organization, ProfessionalService, FAQPage): `src/lib/seo/`
- `public/robots.txt` y `public/sitemap.xml`
- Imagen OG: `public/og-image.svg`

## Formulario

- Endpoint placeholder: `src/pages/api/lead.ts`
- Formulario simple en `src/components/sections/Contact.astro`

Para integrar con Email/CRM/WhatsApp, reemplaza el handler del endpoint o conecta un webhook.

## Deploy recomendado

- Vercel o Netlify

## Checklist

- [ ] Ajustar `site.url` en `src/content/site.ts` y `astro.config.mjs`
- [ ] Actualizar `public/og-image.svg`
- [ ] Completar `public/sitemap.xml` con futuras paginas
- [ ] Verificar metadatos por pagina
- [ ] Validar accesibilidad y Core Web Vitals
- [ ] Configurar analytics (GA4/Tag Manager)
