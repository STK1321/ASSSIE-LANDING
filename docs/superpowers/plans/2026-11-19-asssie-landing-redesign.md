# ASSSIE Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the agency-template landing at `asssie.co` with a six-block narrative that sells what ASSSIE actually does, add `/qr-libre`, and make the site citable by search engines and AI assistants.

**Architecture:** Keep Astro 4 + Tailwind 3 and the existing typed `src/content/*.ts` pattern. Content modules are replaced, not refactored. Page-level sections are deleted and rebuilt; shared atoms and the layout survive. A dependency-free Node script asserts the built `dist/` output so every task has a real, checkable verification step.

**Tech Stack:** Astro 4 (static output), Tailwind 3, TypeScript, Node 20 built-ins. No new packages.

**Spec:** `docs/superpowers/specs/2026-11-19-asssie-landing-redesign-design.md`

## Global Constraints

- Astro 4 + Tailwind 3. No new runtime or dev dependencies, no CMS, no adapter, no SSR.
- Exactly four routes: `/`, `/qr-libre`, `/qr-libre/privacidad`, `/privacidad`.
- Customer-facing copy in Spanish; code, filenames, comments, and tests in English.
- Canonical origin is `https://asssie.co`. The string `asssie.com` must not appear in `src/` or `public/`.
- No prices anywhere. No email anywhere. Contact is WhatsApp only.
- No social profiles: schema `sameAs` carries GitHub only, and only when a URL exists.
- No invented clients, ratings, reviews, team size, or screenshots. The two named clients are allowed.
- Vocabulary blacklist: `soluciones integrales`, `sinergias`, `transformación digital`, `ecosistema`, `potenciar`, `apalancar`, `disruptivo`.
- Accessibility: AA contrast, visible focus, `prefers-reduced-motion` respected, one `<h1>` per page, skip link intact.
- Every section opens with a 40–60 word paragraph in plain Spanish that answers a real question and can be quoted verbatim. No section opens with a slogan.

## Review Focus

The five inputs most likely to break a real visitor:

1. **JavaScript disabled.** The contact form is the only conversion path. Without JS it must still open WhatsApp via a plain link, not silently do nothing.
2. **Landing directly on `/qr-libre`.** Most visitors arrive from a shared link, never the home page. `/qr-libre` must say what the product is within the first screen without depending on home context.
3. **Share preview on WhatsApp.** The site is shared by messaging. `og:image` must be an absolute PNG URL or the card renders blank.
4. **Keyboard and screen-reader navigation on a subpage.** Header and footer anchors currently hardcode `#servicios`; on `/qr-libre` they must point to `/#servicios` or they go nowhere.
5. **A crawler reading the canonical.** Four files currently point at a domain ASSSIE does not own. Any missed file splits the entity.

---

### Task 1: Verification harness and canonical domain

**Files:**
- Create: `scripts/check-site.mjs`
- Modify: `package.json` (scripts)
- Modify: `astro.config.mjs:12` (`site`)
- Modify: `src/content/site.ts`
- Modify: `public/sitemap.xml`, `public/robots.txt`

**Interfaces:**
- Produces: `npm run verify` → builds, then runs the assertions. `REQUIRED_ROUTES` in `scripts/check-site.mjs` is the list later tasks extend.

- [ ] **Step 1: Write the failing check script**

`scripts/check-site.mjs`, Node built-ins only:

```js
import { readFile, access } from "node:fs/promises";
import { join } from "node:path";

const DIST = "dist";
const ORIGIN = "https://asssie.co";
const REQUIRED_ROUTES = ["index.html"];
const FORBIDDEN = ["asssie.com", "Descripción corta", "Ver +1 mas", "soluciones integrales", "transformación digital"];
const failures = [];

const text = async (p) => readFile(join(DIST, p), "utf8");
const mustContain = (name, haystack, needle) => { if (!haystack.includes(needle)) failures.push(`${name}: missing ${needle}`); };
const mustNotContain = (name, haystack, needle) => { if (haystack.includes(needle)) failures.push(`${name}: contains ${needle}`); };

for (const route of REQUIRED_ROUTES) {
  try { await access(join(DIST, route)); } catch { failures.push(`route missing: ${route}`); }
}

const home = await text("index.html");
mustContain("index canonical", home, `<link rel="canonical" href="${ORIGIN}/"`);
for (const word of FORBIDDEN) {
  mustNotContain("index.html", home, word);
  mustNotContain("robots.txt", await text("robots.txt"), word);
  mustNotContain("sitemap.xml", await text("sitemap.xml"), word);
}

const blocks = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (blocks.length === 0) failures.push("index.html: no JSON-LD");
const org = blocks.map((m) => JSON.parse(m[1])).find((b) => b["@type"] === "Organization");
if (!org) failures.push("index.html: no Organization schema");
else {
  if (org.url !== ORIGIN) failures.push(`Organization.url is ${org.url}`);
  if ("email" in org) failures.push("Organization must not publish an email");
}

if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`ok — ${REQUIRED_ROUTES.length} routes checked`);
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npm run build && node scripts/check-site.mjs`
Expected: FAIL listing `index canonical: missing ...`, `contains asssie.com`, and the missing Organization url.

- [ ] **Step 3: Point everything at `asssie.co`**

`astro.config.mjs`: `site: "https://asssie.co"`.
`src/content/site.ts`: `url: "https://asssie.co"`, delete the `email` field, and rewrite the export as:

```ts
export const site = {
  name: "ASSSIE",
  slogan: "Herramientas para el trabajo real",
  url: "https://asssie.co",
  whatsapp: "+573186933354",
  address: { locality: "Sibaté", region: "Cundinamarca", country: "CO" },
  github: "",
  locale: "es",
};
```

`sitemap.xml` and `robots.txt`: every `https://asssie.com` becomes `https://asssie.co`.

- [ ] **Step 4: Run the check again**

Run: `npm run build && node scripts/check-site.mjs`
Expected: FAIL only on `Organization.url` and possibly `no Organization schema` — Task 9 fixes the schema. Every `asssie.com`, forbidden-word, and canonical assertion passes.

- [ ] **Step 5: Add the script npm entries and commit**

`package.json`: `"check:site": "node scripts/check-site.mjs"`, `"verify": "npm run build && npm run check:site"`.

```bash
git add scripts/check-site.mjs package.json astro.config.mjs src/content/site.ts public/sitemap.xml public/robots.txt
git commit -m "chore: add site checks and fix canonical domain"
```

---

### Task 2: Route-aware header and footer, WhatsApp-only contact

**Files:**
- Modify: `src/components/sections/Header.astro`
- Modify: `src/components/sections/Footer.astro`

**Interfaces:**
- Consumes: `site.whatsapp`, `site.address`, `site.name`, `site.github` from Task 1.
- Produces: nav items shaped `{ label, href, home }` where `home` is `true` for in-page anchors so a subpage can prefix `/#`.

- [ ] **Step 1: Extend the check to cover link integrity**

In `scripts/check-site.mjs`, after the home block:

```js
const ATTR = 'href="(#[^"]+|/[^"]*)"';
const anchors = [...home.matchAll(new RegExp(ATTR, "g"))].map((m) => m[1]);
for (const href of anchors) {
  if (href.startsWith("#")) {
    const id = href.slice(1);
    if (!home.includes(`id="${id}"`) && id !== "") failures.push(`index.html: ${href} has no target`);
  }
}
mustNotContain("index.html", home, "hola@");
```

Run: `npm run verify`. Expected: PASS. This proves the shared footer/header current state is self-consistent before the rewrite; it will fail the moment a subpage anchor is added without a prefix.

- [ ] **Step 2: Make the nav route-aware**

In `Header.astro`, replace the `nav` array with:

```astro
const nav = [
  { label: "Qué hacemos", href: "#que-hacemos" },
  { label: "Herramientas", href: "#herramientas" },
  { label: "La prueba", href: "#prueba" },
  { label: "Cómo trabajamos", href: "#proceso" },
];
const here = Astro.url.pathname;
const link = (href: string) => (here === "/" ? href : `/${href}`);
```

Render `link(item.href)` in both the desktop and mobile lists, and `link("#contacto")` on both CTAs.

- [ ] **Step 3: Rewrite the footer**

Three columns: brand + slogan + "Un proyecto de ASSSIE" line; sections using the same `link()` helper; contact with the WhatsApp number as a `wa.me` link and `Sibaté, Cundinamarca`. Delete the email line and the dead "Política de privacidad y términos." text; replace with a real link to `/privacidad` and a second to `/qr-libre/privacidad` labelled "Privacidad de QR Libre". Add a GitHub link only when `site.github` is non-empty.

- [ ] **Step 4: Verify and commit**

Run: `npm run verify`
Expected: PASS.

```bash
git add src/components/sections/Header.astro src/components/sections/Footer.astro scripts/check-site.mjs
git commit -m "feat: route-aware navigation and WhatsApp-only contact"
```

---

### Task 3: Home — hero

**Files:**
- Modify: `src/components/sections/Hero.astro`

**Interfaces:**
- Consumes: `site`, `Button` from Task 1.
- Produces: `<section id="top">` containing the page's only `<h1>`.

- [ ] **Step 1: Add the assertions**

In `scripts/check-site.mjs`:

```js
const h1s = (home.match(/<h1/g) || []).length;
if (h1s !== 1) failures.push(`index.html: expected 1 h1, found ${h1s}`);
mustContain("hero headline", home, "Herramientas para el trabajo real");
mustContain("hero tools cta", home, 'href="#herramientas"');
mustNotContain("index.html", home, 'href="#seo"');
mustNotContain("index.html", home, "Enfoque");
```

Run: `npm run verify`. Expected: FAIL on the h1 count, headline, and `Enfoque`.

- [ ] **Step 2: Replace the copy**

Eyebrow: `Bienes Públicos de ASSSIE`.
`<h1>`: `Herramientas para el trabajo real.`
Paragraph: `Construimos software para el comercio que cobra por QR y para la empresa chica que vive en tres Excels. Lo publicamos abierto, para que cualquiera lo lea y lo use. Gratis en la superficie; a medida cuando tu operación no cabe.`
Primary button: `Ver las herramientas` → `#herramientas`. Secondary: `Hablemos por WhatsApp` → `https://wa.me/${digits}`.
Three factual lines replacing the old trust list: `Código abierto: lo puedes leer` · `Sin cuenta y sin anuncios` · `Te entregamos el código y la documentación`.

- [ ] **Step 3: Rebuild the markup**

Delete the gradient grid overlay, the three `badges` links, and the "Enfoque / Propuesta / Resultados" glass card. Keep `id="top"`, the `reveal` animation, `Button`, and the `Icon name="whatsapp"` on the secondary button. Layout: single column, `max-w-3xl`, `pt-28 pb-16`, headline at `text-4xl sm:text-6xl`.

- [ ] **Step 4: Verify and commit**

Run: `npm run verify`. Expected: PASS.
Run: `npm run dev` and check 375px: headline readable, both buttons reachable by thumb, no horizontal scroll.

```bash
git add src/components/sections/Hero.astro scripts/check-site.mjs
git commit -m "feat: rewrite the hero around the real offer"
```

---

### Task 4: Home — capabilities and direction

**Files:**
- Create: `src/content/capabilities.ts`, `src/content/direction.ts`
- Create: `src/components/molecules/CapabilityCard.astro`
- Create: `src/components/sections/Capabilities.astro`, `src/components/sections/Direction.astro`

**Interfaces:**
- Produces:
  - `capabilities: Capability[]` with `Capability = { problem: string; offer: string; detail: string }`
  - `direction: { intro: string; steps: { title: string; detail: string }[]; closing: string }`

- [ ] **Step 1: Add the assertion**

In `scripts/check-site.mjs`, append `"que-hacemos"` and `"herramientas"` ids to the anchor check by asserting they exist:

```js
for (const id of ["que-hacemos", "herramientas", "prueba", "proceso", "contacto"]) {
  mustContain("index.html", home, `id="${id}"`);
}
```

Run: `npm run verify`. Expected: FAIL for the missing ids.

- [ ] **Step 2: Write the content modules**

`src/content/capabilities.ts`:

```ts
export type Capability = { problem: string; offer: string; detail: string };

export const capabilities: Capability[] = [
  { problem: "La operación que vive en tres Excels",
    offer: "Construimos el sistema que la reemplaza",
    detail: "Inventario, ventas y cartera en un solo lugar, con los datos que ya tienes." },
  { problem: "Los sistemas que no se hablan",
    offer: "Conectamos lo que ya usas",
    detail: "Pagos, WhatsApp, planillas y el software viejo, sin cambiar de herramienta." },
  { problem: "Las decisiones que se toman a ciegas",
    offer: "Analítica y contenido con IA",
    detail: "Qué te deja plata, qué no, y qué publicar sin adivinar." },
];
```

`src/content/direction.ts` holds the copy approved in the spec, verbatim — `intro`, three `steps` (QR Libre, conciliación, cierre), `closing`.

- [ ] **Step 3: Build the two sections**

`Capabilities.astro`: `<section id="que-hacemos">`, `SectionHeading` with title `Lo que construimos`, then a `grid gap-6 md:grid-cols-3` of `CapabilityCard` (`reveal-stagger`, `--stagger`). `CapabilityCard` renders `<h3>{problem}</h3>`, `<p>{offer}</p>`, `<p>{detail}</p>` — no icons, no emoji, no numbered badges.

`Direction.astro`: `<section id="herramientas">`, `SectionHeading` with title `Las herramientas`. Renders `direction.intro`, the three steps as an ordered list with `<h3>` titles and a marker line, then `direction.closing` in a bordered card. Includes a `Button variant="primary" href="/qr-libre"` labelled `Conocer QR Libre`.

- [ ] **Step 4: Verify visually and structurally**

Run: `npm run verify`. Expected: PASS.
Run: `npm run dev` and confirm both sections render at 375px and 1280px without horizontal scroll.

- [ ] **Step 5: Commit**

```bash
git add src/content/capabilities.ts src/content/direction.ts src/components/molecules/CapabilityCard.astro src/components/sections/Capabilities.astro src/components/sections/Direction.astro scripts/check-site.mjs
git commit -m "feat: add capabilities and direction sections"
```

---

### Task 5: Home — proof and process, assembled

**Files:**
- Create: `src/content/proof.ts`, `src/components/molecules/ProofCard.astro`, `src/components/sections/Proof.astro`
- Modify: `src/content/process.ts`, `src/components/sections/Process.astro`, `src/components/molecules/ProcessStep.astro`
- Modify: `src/pages/index.astro`
- Delete: `src/components/sections/{Services,Cases,Plans,Stack,SeoPromise}.astro`, `src/components/molecules/{ServiceCard,PlanCard,CaseCard,TechPill}.astro`, `src/components/atoms/Badge.astro`, `src/content/{services,plans,cases,stack}.ts`

**Interfaces:**
- Produces: `proof: Proof[]` with `Proof = { name: string; sector: string; detail: string; outcome: string }`; `processSteps` reduced to three `{ title, detail }` items.

- [ ] **Step 1: Add the assertion**

In `scripts/check-site.mjs`:

```js
for (const name of ["Proactive Watch", "importadora"]) {
  mustContain("index.html", home, name);
}
mustNotContain("index.html", home, "Caso A:");
mustNotContain("index.html", home, "Plan mensual");
```

Run: `npm run verify`. Expected: FAIL on the two names and on `Caso A:`.

- [ ] **Step 2: Write proof content and section**

`src/content/proof.ts`:

```ts
export type Proof = { name: string; sector: string; detail: string; outcome: string };

export const proof: Proof[] = [
  { name: "Proactive Watch", sector: "Monitoreo de seguridad remoto, Florida",
    detail: "La plataforma que sostiene la operación: casos, historial de incidentes, usuarios y reportes.",
    outcome: "Una operación que atiende propiedades en varios estados desde un solo panel." },
  { name: "Importadora", sector: "Comercio e importación, Colombia",
    detail: "Una app para la gestión del negocio: inventario, ventas y lo que antes vivía en hojas sueltas.",
    outcome: "El día de trabajo en un solo lugar, sin depender de una persona que se acuerde de todo." },
];
```

`Proof.astro` renders `<section id="prueba">`, heading `La prueba`, and the two cards (stacked on mobile, two columns from `md`). Each card: `<h3>`, sector in small caps, `detail`, `outcome`. No logos.

- [ ] **Step 3: Reduce the process to three steps and rebuild the section**

`src/content/process.ts` → three items: `Hablamos y miramos tu operación` / `Construimos lo más pequeño que sirve` / `Te entregamos el código y la documentación`. `Process.astro`: drop the literal "cinco", change the grid to `md:grid-cols-3`, keep `id="proceso"` and `SectionHeading`. `ProcessStep.astro`: remove the `min-h` and the numbered prefix; keep a small step number from `index + 1`.

- [ ] **Step 4: Reassemble the home page and delete the dead files**

`src/pages/index.astro` renders, in order: `Hero`, `Capabilities`, `Direction`, `Proof`, `Process`, `Contact`. Delete every file listed in **Files**. Then:

Run: `grep -rn "ServiceCard\|PlanCard\|CaseCard\|TechPill\|Badge\|@/content/services\|@/content/plans\|@/content/cases\|@/content/stack" src/`
Expected: no output. Fix any hit before continuing.

- [ ] **Step 5: Verify and commit**

Run: `npm run verify`
Expected: PASS, and `npm run build` reports no unresolved imports.

```bash
git add -A
git commit -m "feat: rebuild home with proof and a three-step process"
```

---

### Task 6: `/qr-libre`

**Files:**
- Create: `src/layouts/ProductLayout.astro`, `src/content/qrlibre.ts`, `src/pages/qr-libre.astro`

**Interfaces:**
- Consumes: `Button`, `Icon`, `site.whatsapp`.
- Produces: `qrlibre` content object consumed by both `/qr-libre` and `/qr-libre/privacidad`.

- [ ] **Step 1: Add the route assertion**

In `scripts/check-site.mjs`: `REQUIRED_ROUTES.push("qr-libre/index.html")`, then

```js
const product = await text("qr-libre/index.html");
mustContain("qr-libre canonical", product, `<link rel="canonical" href="${ORIGIN}/qr-libre"`);
mustContain("qr-libre h1", product, "<h1");
mustContain("qr-libre status", product, "En construcción");
mustContain("qr-libre limits", product, "no confirma");
mustContain("qr-libre nav prefix", product, 'href="/#herramientas"');
mustNotContain("qr-libre.html", product, 'href="#herramientas"');
```

Run: `npm run verify`. Expected: FAIL — the route does not exist.

- [ ] **Step 2: Write the content module**

`src/content/qrlibre.ts` exports `qrlibre = { name: "QR Libre", tagline: "Tu pago suena. Tu negocio sigue.", status: "En construcción", updated: "2026-11-19", what: string[], notWhat: string[], how: { title: string; detail: string }[], faq: { question: string; answer: string }[], repo: "" }`.

`notWhat` must include, in plain Spanish: it does not confirm payments, it does not connect to any bank account, and it does not replace the bank receipt.

- [ ] **Step 3: Build the layout and the page**

`ProductLayout.astro` mirrors `BaseLayout` (same head, skip link, `Header`, `Footer`) but takes `accent` and applies it by setting `style={`--product-accent:${accent}`}` on `<body>`. Add `--product-accent` to `global.css` as `#0f766e` default so nothing breaks if unset.

`qr-libre.astro` sets `accent="#1d4ed8"` and renders, in order: `<h1>` tagline; one-paragraph explanation; a "Qué hace / Qué no hace" two-column block (`notWhat` items styled with a neutral marker, never red-alarm); `Cómo funciona` (three steps); `Estado` showing `status` and `updated`; repository button (disabled-looking with an explicit "todavía no está público" line when `repo` is empty); FAQ using `FAQItem`; one closing line `Un proyecto de ASSSIE`.

- [ ] **Step 4: Verify**

Run: `npm run verify`. Expected: PASS with two routes.
Manual: open `/qr-libre` with the home page never visited; the first screen must identify the product and who makes it.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/ProductLayout.astro src/content/qrlibre.ts src/pages/qr-libre.astro src/styles/global.css scripts/check-site.mjs
git commit -m "feat: add the QR Libre page"
```

---

### Task 7: Privacy pages

**Files:**
- Create: `src/pages/privacidad.astro`, `src/pages/qr-libre/privacidad.astro`

**Interfaces:**
- Consumes: `ProductLayout`, `qrlibre` from Task 6.

- [ ] **Step 1: Add the assertions**

```js
REQUIRED_ROUTES.push("privacidad/index.html", "qr-libre/privacidad/index.html");
mustContain("footer privacy link", home, 'href="/privacidad"');
mustContain("app privacy link", product, 'href="/qr-libre/privacidad"');
```

Run: `npm run verify`. Expected: FAIL.

- [ ] **Step 2: Write the site policy**

`/privacidad`: who is responsible (ASSSIE, Sibaté), what the form collects (name, company, what you need, size), that it is sent by WhatsApp and therefore also subject to WhatsApp's terms, that nothing is stored on this site, how to ask for deletion, and the date. No legal boilerplate copied from a template; short sentences.

- [ ] **Step 3: Write the app policy**

`/qr-libre/privacidad`: an explicit banner — "Esta política aplica cuando la app esté publicada; hoy QR Libre está en construcción." Then: what it reads (notifications only for apps the user enables), what it stores (on the device), what it never does (no account, no ads, no sending message content to a server), how to revoke the notification permission in Android settings, how to delete local data, and contact.

- [ ] **Step 4: Verify and commit**

Run: `npm run verify`. Expected: PASS with four routes.

```bash
git add src/pages/privacidad.astro src/pages/qr-libre/privacidad.astro scripts/check-site.mjs
git commit -m "feat: add site and app privacy pages"
```

---

### Task 8: Contact goes to WhatsApp

**Files:**
- Modify: `src/components/sections/Contact.astro`
- Delete: `src/pages/api/lead.ts`
- Modify: `src/content/qrlibre.ts` only if the CTA copy needs the phone

**Interfaces:**
- Produces: `waLink(fields: Record<string,string>) => string` local helper in `Contact.astro` used by both the form handler and the no-JS fallback.

- [ ] **Step 1: Add the assertion**

```js
mustContain("contact whatsapp", home, "wa.me");
mustContain("contact fallback", home, "<noscript>");
mustNotContain("contact endpoint", home, 'action="/api/lead"');
```

Run: `npm run verify`. Expected: FAIL.

- [ ] **Step 2: Rewrite the form**

Fields: `name` (required), `whatsapp` (optional), `goal` (required, textarea), `company` (optional), `companySize` (optional, same options). Remove the hidden `serviceInterest` input and every reference to it. The `<form>` keeps `id="lead-form"` but loses `action`/`method`, and gets a real `<noscript>` block: a `wa.me` link built at build time with `define:vars`, labelled `Escribir por WhatsApp`.

- [ ] **Step 3: Replace the handler**

`buildMessage(values) => string` produces `Hola, soy ${name}. ${goal}` plus optional company lines. On submit: `preventDefault()`, validate `name` and `goal` client-side (the form already has `novalidate`), then `window.open("https://wa.me/<digits>?text=" + encodeURIComponent(buildMessage(...)), "_blank", "noopener")`. Keep the existing loading/success/error status element, with success meaning "abrimos WhatsApp" and an error message that shows the same link as text so it is never a dead end.

- [ ] **Step 4: Verify and commit**

Run: `npm run verify`. Expected: PASS.
Manual with JS disabled: the `<noscript>` link opens WhatsApp with the base message.

```bash
git add -A
git commit -m "feat: send leads to WhatsApp instead of a dead endpoint"
```

---

### Task 9: GEO — schema, preview image, llms.txt

**Files:**
- Modify: `src/lib/seo/schemas.ts`, `src/lib/seo/seo.ts`, `src/pages/index.astro`, `src/pages/qr-libre.astro`
- Create: `public/llms.txt`
- Modify: `public/og-image.svg` → generate `public/og-image.png`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Produces: `buildOrganizationSchema()`, `buildWebSiteSchema()`, `buildFaqSchema(items)`, `buildSoftwareApplicationSchema()`, `buildBreadcrumbSchema(path, name)`. All return plain objects; `@type` values are literal strings.

- [ ] **Step 1: Add the assertions**

```js
const productBlocks = [...product.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const app = productBlocks.find((b) => b["@type"] === "SoftwareApplication");
if (!app) failures.push("qr-libre: no SoftwareApplication schema");
else {
  if (app.isAccessibleForFree !== true) failures.push("SoftwareApplication.isAccessibleForFree must be true");
  if (!("license" in app)) failures.push("SoftwareApplication needs a license");
}
mustContain("og image", home, 'property="og:image" content="https://asssie.co/og-image.png"');
mustContain("llms", await text("llms.txt"), "/qr-libre");
```

Run: `npm run verify`. Expected: FAIL.

- [ ] **Step 2: Rewrite the schema builders**

Organization: `name`, `url`, `logo` (`${site.url}/og-image.png`), `address` as a `PostalAddress` from `site.address`, `contactPoint` with `contactType: "sales"` and `telephone: site.whatsapp`, `sameAs: site.github ? [site.github] : []`. No `email` key. `buildWebSiteSchema()` returns `WebSite` with `name` and `url`. `buildSoftwareApplicationSchema()` returns `SoftwareApplication` with `name`, `applicationCategory: "FinanceApplication"`, `operatingSystem: "Android"`, `isAccessibleForFree: true`, `license: "https://opensource.org/licenses/MIT"`, `url: ${site.url}/qr-libre`, and `codeRepository` only when `qrlibre.repo` is non-empty. `buildBreadcrumbSchema` returns `BreadcrumbList` with two `ListItem`s.

- [ ] **Step 3: Regenerate the social image**

Replace `public/og-image.svg` with a 1200×630 PNG at `public/og-image.png` containing the ASSSIE mark, the line `Herramientas para el trabajo real`, and `asssie.co`. Convert with `sips` on macOS (`sips -s format png public/og-image.svg --out public/og-image.png`) or any available converter; if the result is not 1200×630, resize with `sips -z 630 1200`. Update `seo.ts` default image to `${site.url}/og-image.png`.

- [ ] **Step 4: Write `llms.txt` and the sitemap**

`public/llms.txt`: a short plain-text file with the entity name, one-line description, the four URLs with a one-line purpose each, the WhatsApp contact, and the repository location when it exists.

`sitemap.xml`: four `<url>` entries with the correct paths and no `asssie.com`.

- [ ] **Step 5: Verify and commit**

Run: `npm run verify`. Expected: PASS.
Run: `curl -s localhost:4321 | head` after `npm run dev` and paste the JSON-LD into a validator mentally: every `@type` matches a builder, no `null` fields.

```bash
git add -A
git commit -m "feat: GEO schema, social image and llms.txt"
```

---

### Task 10: Final pass

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update the README** to describe the four routes, the content modules, `npm run verify`, and that the plan lives in `docs/superpowers/`.

- [ ] **Step 2: Run the full verification**

Run: `npm run verify`
Expected: PASS.
Run: `npx astro check`
Expected: no errors.

- [ ] **Step 3: Manual review checklist**

- 375px and 1280px on `/`, `/qr-libre`, `/privacidad`.
- Tab through the header on `/qr-libre`; every anchor lands.
- Form with JS off opens WhatsApp.
- `grep -rn "asssie.com" src public` returns nothing.
- No `1️⃣`, no `Descripción corta`, no "Plan mensual" anywhere.
- Outside the repo: in Cloudflare, `www.asssie.co` must 301 to `https://asssie.co`. Verify with `curl -sI https://www.asssie.co | head -1`; it currently answers `200`, so the rule is present but not acting.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "docs: update README for the new structure"
```
