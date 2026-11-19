# ASSSIE landing redesign — narrative, /qr-libre, GEO

Date: 2026-11-19
Status: design, pending approval
Repo: `STK1321/ASSSIE-LANDING` (Astro 4 + Tailwind 3), branch `feat/narrativa-bienes-publicos`

## 1. Intent and why

ASSSIE currently sells itself as an automation/data/AI agency. The live site is a
one-page agency template: nine sections that all restate "we are competent", several
internal labels shipped as user-facing copy (`Descripción corta`, `Ver +1 mas en el
alcance`, emoji numbering `1️⃣`), and a pricing table whose cards say "Plan mensual"
with no price at all.

The company is being repositioned. Instead of selling agency services, ASSSIE builds
and publishes open tools for people who work — the merchant who gets paid by QR, the
small operation that lives in a notebook, the company that does not fit a US SaaS —
and sells the adaptation of those tools to a specific operation. QR Libre (an Android
app that announces payment notifications by voice, open source, free) is the first
tool and the proof that this is real work and not a deck.

The site has one job: a visitor understands in ten seconds what ASSSIE builds, sees
public proof, and knows how to ask for work.

## 2. Goals

- A merchant or small-company owner recognizes themselves in the first screen.
- The open tools are the center of the site, not an appendix.
- Google and AI assistants can cite ASSSIE as a real entity (GEO).
- `/qr-libre` exists, has its own identity, and can be linked and shared on its own.
- Keep what the repo already does well: static output, technical SEO, fast load.

## 3. Non-goals

- No blog, no CMS, no docs portal, no changelog.
- No e-commerce or checkout.
- No new backend. The lead endpoint stays as-is.
- No APK published in this change.
- No claim that ASSSIE verifies payments, has bank integrations, or is affiliated
  with any bank or with Bre-B.

## 4. Anti-goals

- Looking like one more agency. Concretely: no "soluciones integrales", no
  "transformación digital", no stock-photo hero of people pointing at laptops.
- An inflated product page for QR Libre that promises a polished app that does not
  exist yet.
- Naming clients without their permission.
- Inventing prices, testimonials, ratings, or team size.

## 5. Constraints

- Astro 4 + Tailwind 3, already installed. The stack does not change.
- Four routes only: `/`, `/qr-libre`, `/qr-libre/privacidad`, `/privacidad`.
- No new runtime dependencies. No CMS.
- Customer-facing copy in Spanish. Code, comments, and this document in English.
- Accessibility stays: AA contrast, visible focus, `prefers-reduced-motion` support,
  skip link, semantic headings.
- Deploy target unchanged (Vercel/Netlify), canonical domain `asssie.co`.

## 6. Approaches considered

**A. Fix in place.** Keep nine sections and the current design; correct copy,
placeholders, domains, OG, GEO. Cheap, but leaves the template and does not fix why
it does not sell.

**B. Same stack, new narrative.** Keep Astro + Tailwind and the visual identity
(teal `#0f766e`, amber `#f59e0b`, Space Grotesk / Work Sans), rebuild the content
model and the section set, add `/qr-libre`, fix GEO. *(Chosen.)*

**C. Rebuild from scratch on a new stack.** Highest visual impact, highest risk,
loses what the repo already does well, and reopens the base instead of the message.

## 7. Decisions taken by the client

- Work directly on `ASSSIE-LANDING`, not a separate repo.
- Audience: ordinary working people and small operations, not enterprises.
- Model: tools free and complete; revenue from adapting or deploying them.
- Open source is a distribution channel, not charity.
- Focus territory: businesses that get paid by QR and run their operation on paper
  or spreadsheets. QR Libre is the entry point.
- **No prices on the site.** The site states direction and capability; the number is
  discussed in the conversation.
- **Leads arrive by WhatsApp.** No CRM, no email routing, no form service.
- **Clients may be named:** the importer and Proactive Watch.
- **"Marketing" stays but is reframed** as content and analytics with AI, backed by
  the `ttstudio` work — not generic digital marketing.
- **No social profiles exist.** No Instagram, TikTok, or company LinkedIn. Contact is
  WhatsApp and the site itself; the only external identity to build is GitHub.
- Address published as Sibaté, Cundinamarca — no street address.
- **No email on the site.** Contact is WhatsApp only. The Organization schema omits
  `email` and publishes a `ContactPoint` with the WhatsApp number instead.
- **Cloudflare already holds DNS.** The `www` → apex redirect is a Cloudflare rule, not
  an application change.
- The first QR Libre APK is expected today (2026-11-19).

## 8. Positioning (the deliverable this document exists for)

**One line**

> Herramientas para el trabajo real. Abiertas, gratis, y adaptables a tu operación.

**What ASSSIE is**

A company that builds software for people who work: the merchant who sells by QR, the
one who keeps the books in a notebook, the small company that does not fit a US SaaS.
It publishes the code in the open and adapts it when an operation needs it.

**Why us — three verifiable reasons, none of them "we code well"**

1. We have built real operations: inventory and management software for an importer,
   and the monitoring platform behind a remote security operation that works in the
   United States.
2. We publish the code. If it does not fit you, you audit it, take it, or improve it.
3. We hand over code and documentation. You are never locked in.

**Model, said out loud**

Bienes Públicos de ASSSIE. Every tool is free and complete — no crippled version, no
ads, no account required. Money comes from adapting a tool to one operation, or from
deploying it for a guild, cooperative, or institution. Free does not mean abandoned:
the page says who maintains it and how often.

**Tone**

Plain Spanish, short sentences, the way a neighbor would explain it. Second person.
No agency jargon. Numbers where they exist, silence where they do not.

**Vocabulary blacklist**

soluciones integrales · sinergias · transformación digital · ecosistema · potenciar ·
apalancar · disruptivo · "a medida para tu éxito" · "llevamos tu negocio al siguiente
nivel"

## 9. Page structure

### 9.1 Home (`/`)

1. **Hero.** What we build, for whom, in one sentence plus one concrete line. Primary
   action: see the tools. Secondary: talk to us.
2. **Lo que construimos.** Three capabilities framed as problems, not services:
   - *La operación que vive en tres Excels.* Custom software that replaces it.
   - *Los sistemas que no se hablan.* Integrations: payments, messaging, spreadsheets.
   - *Las decisiones que se toman a ciegas.* Data work: which customer makes money and
     which one takes it away.
3. **Las herramientas — y hacia dónde vamos.** The center of the page. QR Libre now,
   then the same day of work it belongs to. This block replaces the old pricing
   section, which is removed: there will be no prices on the site. Plain copy:

   > Un comerciante en Colombia hace tres cosas todos los días: cobra, cuenta y cierra.
   > Cada una vive en un lugar distinto —el QR del banco, el cuaderno, el WhatsApp— y
   > ninguna le habla a la otra.
   >
   > Empezamos por lo primero: **QR Libre** avisa en voz alta cuando entra un pago, sin
   > comprar equipos y sin mensualidad.
   >
   > Sigue la conciliación: que la plata que entró coincida con lo que se vendió, sin
   > abrir tres aplicaciones.
   >
   > Y el cierre: cuánto entró, cuánto salió, cuánto quedó, en una pantalla que se
   > entiende sin ser contador.
   >
   > Nada de esto pide cuenta, anuncios ni depender de nosotros. El código es abierto;
   > si un día no estamos, sigue funcionando.
4. **La prueba.** The importer and the security platform. Describe the work, not the
   logo, unless permission to name is granted.
5. **Cómo trabajamos.** Three steps, plain: we talk and look at your operation; we
   build the smallest thing that works; we hand over code and documentation.
6. **Contacto.** Same form, same endpoint. One line saying what happens after sending.

Plans/pricing are removed entirely, not replaced by a table. The site says where the
work is going and what ASSSIE can do; the number comes in the conversation. The tools
block above carries that job.

### 9.2 `/qr-libre`

Own layout, own accent color, same typefaces. Sections: hero (the promise + what it
does not do), how it works in three steps, privacy and the notification permission
explained like a human, project status with a date, repository link, download when it
exists, FAQ, and a discreet footer line: a project by ASSSIE.

No fake screenshots. If the app is not ready, the page says so with a date and shows
the repository instead.

**The app does not exist yet.** What exists today is a Rust/Axum backend scaffold and a
README describing the intended Android pipeline. `/qr-libre` therefore must not
describe implemented behavior, and `/qr-libre/privacidad` must be written from the
design commitments, visibly marked as the policy that applies once the app ships —
never as a description of what a real build does today. Play Store requires that page
at publish time, not before.

### 9.3 `/qr-libre/privacidad`

What is read, what is stored, what is never sent, how to revoke the notification
permission, contact. Required for Play Store and for trust; the footer currently
promises this page and does not have it.

## 10. GEO (generative engine optimization)

GEO here is not metadata tricks. It is being a citable entity. Concretely:

- **One canonical domain.** `asssie.co` in `astro.config.mjs`, `site.ts` (url and
  email), `sitemap.xml`, `robots.txt`. Today all four say `asssie.com` while the
  site is served from `.co`.
- **Social preview that renders.** `og-image.svg` does not show in WhatsApp, LinkedIn,
  or X. Replace with a 1200×630 PNG.
- **Entity consistency.** Same name, address, phone, and email everywhere. `sameAs`
  points only to what actually exists: the GitHub organization. There are no social
  profiles today, and inventing or linking empty ones weakens the entity. A GitHub
  organization for ASSSIE is the single highest-value GEO action available — it is the
  strongest citation source in this strategy and today it does not exist.
- **Contact is WhatsApp.** `ContactPoint` with the WhatsApp number, not a `sameAs`.
  No `email` field anywhere in the schema, and `site.ts` drops `email`.
- **The `www` redirect lives in Cloudflare.** DNS is already there; the rule is
  `www.asssie.co` → `https://asssie.co` (301). It is not active today: both hosts
  answer 200.
- **Answer-first blocks.** Each section opens with one 40–60 word paragraph that
  answers a real question and can be quoted verbatim by a model.
- **Structured data.** Organization and ProfessionalService (keep, corrected),
  FAQPage (rewritten questions), `Service` per capability, `BreadcrumbList` on
  `/qr-libre`, and on `/qr-libre` a `SoftwareApplication` with `codeRepository`,
  `license`, and `isAccessibleForFree: true`.
- **`/llms.txt`** listing the three routes, what ASSSIE is, and where the code lives.
- **Freshness.** A visible "última actualización" date on `/qr-libre` and in the repo
  README.
- **No fabricated authority.** No aggregateRating, no fake reviews, no invented client
  logos. Fake structured data is both dishonest and penalized.

## 11. Builder's calls (mine, with reasons)

- **Six home blocks instead of nine.** Hero, what we build, the tools and where they
  go, the proof, how we work, contact. Nine sections forced repetition; each new
  section restated the previous one. Six can each carry a different job.
- **Plans section removed.** It has no prices and "No incluye" lists that undercut it.
- **"IA para video e imagen" leaves the main offer.** It dilutes the positioning and
  is the least defensible capability next to a payment-adjacent open-source project.
- **Capabilities become three, not five.** ML, automation, and custom dev merge into
  three problem-shaped blocks; marketing is an open question below, not a silent drop.
- **Header anchors become route-aware.** Home keeps `#` anchors; `/qr-libre` links back
  with `/#servicios`. The current header hardcodes anchors that break on any new route.
- **QR Libre keeps ASSSIE's typefaces** but gets its own accent so it reads as a
  product, not a subpage. Reusing the type system keeps the family resemblance.
- **Content stays in typed `src/content/*.ts`.** The repo already separates content
  from components; the rewrite replaces the data, not the pattern.
- **No `@astrojs/sitemap`.** With four static routes, the hand-written sitemap is
  correct and dependency-free.
- **A site privacy page is added (`/privacidad`).** The footer already promises one,
  the lead form collects personal data, and Colombian law (Ley 1581) expects a notice
  where data is collected. It is a fourth route, separate from the app policy.
- **Form fields change.** "Empresa" becomes optional and a phone/WhatsApp field is
  added. The positioning says the audience keeps the books in a notebook; a required
  "Empresa" field asks them to be someone else.
- **`asssie.co` is canonical without `www`.** Both `asssie.co` and `www.asssie.co`
  answer 200 today, which is duplicate content. Canonical is `https://asssie.co`, and
  the host or Cloudflare should 301 `www` to the apex.
- **`asssie.com` is not ours to redirect.** It resolves to a Shopify store returning
  404 ("This store is unavailable"). No redirect work; the fix is to stop pointing
  canonicals, sitemap, robots and the schema at a domain ASSSIE does not serve.

## 12. Findings from the implementation review

- **The lead form is broken in production.** `src/pages/api/lead.ts` is a placeholder,
  and the site builds statically: the endpoint cannot accept a POST in the deployed
  artifact. The contact form is the only conversion path on the site and today it
  silently does nothing. Either it gets a real destination (form service or a server
  function on the host) or the copy must stop promising a reply.
- `www.asssie.co` and the apex both return 200 (duplicate content).
- `asssie.com` returns 404 from a Shopify store — the canonical domain in four files
  points at a site that is not ASSSIE's.
- The README documents `ServiceModal.astro`, which does not exist in the repo.

## 13. Open questions for the client

Nothing blocks the build. Two items are handled outside the code:

- **Email omitted.** No `hola@asssie.co` for now; WhatsApp is the only contact channel.
- **`www` → apex** is a Cloudflare redirect rule. DNS already lives there. It is not
  active today — both hosts answer 200 — so the rule has to exist before the canonical
  switch is complete. The application side only sets `https://asssie.co` as canonical.

Settled and no longer open: marketing stays as content/analytics with AI · clients may
be named · no prices · no social profiles · Sibaté only · APK expected today · leads
to WhatsApp.

## 14. What is left to the builder

Ordering inside `/qr-libre`, exact section copy, illustration or screenshot strategy,
and the visual execution of the six home blocks within the existing identity. Plus one
honest constraint on "APK today": a real Android build needs the
`NotificationListenerService`, the per-bank parsers, and local storage. What can exist
today is a prototype that listens to notifications and speaks the amount — enough for a
demo and a screen recording, not enough for Play Store. The page adapts to whichever
exists at build time.
