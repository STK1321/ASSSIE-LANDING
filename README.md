# ASSSIE Landing Page (Astro)

Landing page para agencia de automatización, datos e IA. Enfocada en conversión, SEO técnico y performance.

## Instalación

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - entorno local
- `npm run build` - build de producción
- `npm run preview` - previsualización del build
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

- Hero + confianza: `src/components/sections/Hero.astro`
- Servicios y modales: `src/content/services.ts`
- Proceso: `src/content/process.ts`
- Casos tipo: `src/content/cases.ts`
- Planes: `src/content/plans.ts`
- FAQ: `src/content/faq.ts`
- Stack: `src/content/stack.ts`
- Datos de marca/contacto: `src/content/site.ts`

## Servicios + modal

El contenido de cada servicio vive en `src/content/services.ts` con estos campos:

- `id`, `title`, `subtitle`, `description`
- `idealFor[]`, `benefits[]`, `scope[]`, `deliverables[]`
- `typicalTimeline`, `modalCtaLabel`

El modal se renderiza en `src/components/molecules/ServiceModal.astro` y se abre desde los botones "Ver alcance".

## Formulario

- Endpoint placeholder: `src/pages/api/lead.ts`
- Formulario con estados (loading/success/error) en `src/components/sections/Contact.astro`
- Campo oculto `serviceInterest` prellenado desde el modal de servicios

Para integrar con Email/CRM/WhatsApp, reemplaza el handler del endpoint o conecta un webhook.

## SEO técnico

- Meta tags, Open Graph y Twitter Cards: `src/layouts/BaseLayout.astro`
- JSON-LD (Organization, ProfessionalService, FAQPage): `src/lib/seo/schemas.ts`
- Helper SEO: `src/lib/seo/seo.ts`
- `public/robots.txt` y `public/sitemap.xml`
- Imagen OG: `public/og-image.svg`

## Deploy recomendado

- Vercel o Netlify

## Checklist

- [ ] Ajustar `site.url` en `src/content/site.ts` y `astro.config.mjs`
- [ ] Actualizar `public/og-image.svg`
- [ ] Completar `public/sitemap.xml` con futuras páginas
- [ ] Verificar metadatos por página
- [ ] Validar accesibilidad y Core Web Vitals
- [ ] Configurar analytics (GA4/Tag Manager)
