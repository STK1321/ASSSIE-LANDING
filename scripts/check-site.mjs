import { readFile, access } from "node:fs/promises";
import { join } from "node:path";

const DIST = "dist";
const ORIGIN = "https://asssie.co";
const REQUIRED_ROUTES = ["index.html", "qr-libre/index.html"];
const FORBIDDEN = ["asssie.com", "Descripción corta", "Ver +1 mas", "soluciones integrales", "transformación digital"];
const failures = [];

const text = async (p) => readFile(join(DIST, p), "utf8");
const mustContain = (name, haystack, needle) => { if (!haystack.includes(needle)) failures.push(`${name}: missing ${needle}`); };
const mustNotContain = (name, haystack, needle) => { if (haystack.includes(needle)) failures.push(`${name}: contains ${needle}`); };

REQUIRED_ROUTES.push("privacidad/index.html", "qr-libre/privacidad/index.html");

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

const ATTR = 'href="(#[^"]+|/[^"]*)"';
// Task 5 emptied this list once the redesign sections landed. Keep the mechanism
// for any section that is linked before it exists.
const PENDING_IDS = [];
const anchors = [...home.matchAll(new RegExp(ATTR, "g"))].map((m) => m[1]);
for (const href of anchors) {
  if (href.startsWith("#")) {
    const id = href.slice(1);
    if (!home.includes(`id="${id}"`) && id !== "" && !PENDING_IDS.includes(id)) failures.push(`index.html: ${href} has no target`);
  }
}
for (const id of ["que-hacemos", "herramientas", "prueba", "proceso", "contacto"]) {
  mustContain("index.html", home, `id="${id}"`);
}
const h1s = (home.match(/<h1/g) || []).length;
if (h1s !== 1) failures.push(`index.html: expected 1 h1, found ${h1s}`);
mustContain("hero headline", home, "Herramientas para el trabajo real");
mustContain("hero tools cta", home, 'href="#herramientas"');
mustNotContain("index.html", home, 'href="#seo"');
mustNotContain("index.html", home, "Enfoque");

for (const name of ["Proactive Watch", "Importadora"]) {
  mustContain("index.html", home, name);
}
mustNotContain("index.html", home, "Caso A:");
mustNotContain("index.html", home, "Plan mensual");

mustNotContain("index.html", home, "hola@");

const blocks = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (blocks.length === 0) failures.push("index.html: no JSON-LD");
const homeBlocks = blocks.map((m) => JSON.parse(m[1]));
const org = homeBlocks.find((b) => b["@type"] === "Organization");
if (!org) failures.push("index.html: no Organization schema");
else {
  if (org.url !== ORIGIN) failures.push(`Organization.url is ${org.url}`);
  if ("email" in org) failures.push("Organization must not publish an email");
  if (org.address?.["@type"] !== "PostalAddress") failures.push("Organization needs a PostalAddress");
  if (org.contactPoint?.["@type"] !== "ContactPoint") failures.push("Organization needs a ContactPoint");
  if (org.contactPoint?.contactType !== "sales") failures.push("Organization contactPoint.contactType must be sales");
  if (!org.contactPoint?.telephone) failures.push("Organization contactPoint needs a telephone");
  if ("sameAs" in org && (!Array.isArray(org.sameAs) || org.sameAs.length === 0)) failures.push("Organization.sameAs must be omitted when there is no profile");
}
const website = homeBlocks.find((b) => b["@type"] === "WebSite");
if (!website) failures.push("index.html: no WebSite schema");
else if (website.url !== ORIGIN || website.name !== "ASSSIE") failures.push("WebSite name/url are wrong");

const product = await text("qr-libre/index.html");
mustContain("qr-libre canonical", product, `<link rel="canonical" href="${ORIGIN}/qr-libre"`);
mustContain("qr-libre h1", product, "<h1");
mustContain("qr-libre status", product, "En construcción");
mustContain("qr-libre limits", product, "no confirma");
mustContain("qr-libre nav prefix", product, 'href="/#herramientas"');
mustNotContain("qr-libre.html", product, 'href="#herramientas"');

const productBlocks = [...product.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const app = productBlocks.find((b) => b["@type"] === "SoftwareApplication");
if (!app) failures.push("qr-libre: no SoftwareApplication schema");
else {
  if (app.isAccessibleForFree !== true) failures.push("SoftwareApplication.isAccessibleForFree must be true");
  if (!("license" in app)) failures.push("SoftwareApplication needs a license");
  if ("codeRepository" in app) failures.push("SoftwareApplication must omit codeRepository while the repo is private");
  if ("installUrl" in app) failures.push("SoftwareApplication must omit installUrl while the app is not installable");
}
const productFaq = productBlocks.find((b) => b["@type"] === "FAQPage");
if (!productFaq) failures.push("qr-libre: no FAQPage schema");
else if (productFaq.mainEntity?.length !== 5) failures.push(`qr-libre FAQPage has ${productFaq.mainEntity?.length ?? 0} questions`);
const breadcrumb = productBlocks.find((b) => b["@type"] === "BreadcrumbList");
if (!breadcrumb) failures.push("qr-libre: no BreadcrumbList schema");
else if (breadcrumb.itemListElement?.length !== 2) failures.push("BreadcrumbList must have exactly two ListItems");

const optionalText = async (p) => { try { return await text(p); } catch { failures.push(`missing dist/${p}`); return ""; } };

mustContain("og image", home, 'property="og:image" content="https://asssie.co/og-image.png"');
mustContain("twitter image", product, 'name="twitter:image" content="https://asssie.co/og-image.png"');
mustContain("llms", await optionalText("llms.txt"), "/qr-libre");

const sitemap = await text("sitemap.xml");
const expectedLocs = [`${ORIGIN}/`, `${ORIGIN}/qr-libre`, `${ORIGIN}/privacidad`, `${ORIGIN}/qr-libre/privacidad`];
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length !== expectedLocs.length) failures.push(`sitemap.xml: expected ${expectedLocs.length} urls, found ${locs.length}`);
for (const loc of expectedLocs) mustContain("sitemap", sitemap, `<loc>${loc}</loc>`);

mustContain("footer privacy link", home, 'href="/privacidad"');
mustContain("app privacy link", product, 'href="/qr-libre/privacidad"');

mustContain("contact whatsapp", home, "wa.me");
mustContain("contact fallback", home, "<noscript>");
mustNotContain("contact endpoint", home, 'action="/api/lead"');

if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`ok — ${REQUIRED_ROUTES.length} routes checked`);
