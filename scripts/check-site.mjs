import { readFile, access, readdir } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";

const DIST = "dist";
const ORIGIN = "https://www.asssie.co";
const REQUIRED_ROUTES = [
  "index.html",
  "qr-libre/index.html",
  "privacidad/index.html",
  "qr-libre/privacidad/index.html",
];
const FORBIDDEN = ["asssie.com", "Descripción corta", "Ver +1 mas", "soluciones integrales", "transformación digital"];
// Strings the redesign removed. They must not survive on any page, not only the home.
const LEGACY = [...FORBIDDEN, "1️⃣", "Plan mensual"];
const TEXT_EXTENSIONS = new Set([".html", ".txt", ".xml", ".svg", ".css", ".js", ".json"]);
const failures = [];

const mustContain = (name, haystack, needle) => { if (!haystack.includes(needle)) failures.push(`${name}: missing ${needle}`); };
const mustNotContain = (name, haystack, needle) => { if (haystack.includes(needle)) failures.push(`${name}: contains ${needle}`); };
const mustNotContainCI = (name, haystack, needle) => {
  if (haystack.toLowerCase().includes(needle.toLowerCase())) failures.push(`${name}: contains ${needle}`);
};

// Every dist read goes through here. A missing file becomes a named failure
// instead of an unhandled ENOENT that hides the assertions after it.
const readDist = async (p) => {
  try {
    return await readFile(join(DIST, p), "utf8");
  } catch {
    failures.push(`dist/${p}: missing or unreadable`);
    return "";
  }
};

const listFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(full)));
    else files.push(full);
  }
  return files;
};

for (const route of REQUIRED_ROUTES) {
  try { await access(join(DIST, route)); } catch { failures.push(`route missing: ${route}`); }
}

let distFiles = [];
try { distFiles = await listFiles(DIST); } catch { failures.push(`dist/: missing or unreadable; run npm run build first`); }

const rel = (file) => relative(DIST, file).split(sep).join("/");
const pages = new Map();
for (const file of distFiles.filter((f) => extname(f) === ".html")) {
  pages.set(rel(file), await readDist(rel(file)));
}
const textFiles = distFiles.filter((f) => TEXT_EXTENSIONS.has(extname(f).toLowerCase()));
const home = pages.get("index.html") ?? "";

// Any string the old site shipped must be gone from every page and from llms.txt.
for (const target of [...pages.keys(), "llms.txt"]) {
  const content = target === "llms.txt" ? await readDist("llms.txt") : pages.get(target);
  for (const word of LEGACY) mustNotContain(target, content, word);
}
for (const target of ["robots.txt", "sitemap.xml"]) {
  const content = await readDist(target);
  for (const word of FORBIDDEN) mustNotContain(target, content, word);
}

// A template that leaked a raw object is a real bug; it must never ship.
for (const file of distFiles) {
  const name = rel(file);
  mustNotContain(`${name} [object Object]`, await readDist(name), "[object Object]");
}

// There is no email contact anywhere: WhatsApp is the only channel.
for (const file of textFiles) {
  const name = rel(file);
  const content = await readDist(name);
  mustNotContainCI(`${name} email`, content, "mailto:");
  mustNotContainCI(`${name} email`, content, "email");
}

// FAQPage is valid only on the QR Libre page; it was removed from the home.
for (const [name, content] of pages) {
  if (name === "qr-libre/index.html") mustContain("qr-libre FAQPage", content, "FAQPage");
  else mustNotContain(`${name} FAQPage`, content, "FAQPage");
}

// The home canonical must be exact: a prefix would also match /qr-libre.
mustContain("index canonical", home, `<link rel="canonical" href="${ORIGIN}/">`);

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

for (const name of ["Proactive Watch", "Chico Corp"]) {
  mustContain("index.html", home, name);
}
mustNotContain("index.html", home, "Caso A:");

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
  if (!Array.isArray(org.sameAs) || !org.sameAs.includes("https://github.com/ASSSIE-SAS")) failures.push("Organization.sameAs must point at the GitHub organization");
}
const website = homeBlocks.find((b) => b["@type"] === "WebSite");
if (!website) failures.push("index.html: no WebSite schema");
else if (website.url !== ORIGIN || website.name !== "ASSSIE") failures.push("WebSite name/url are wrong");

const product = pages.get("qr-libre/index.html") ?? "";
mustContain("qr-libre canonical", product, `<link rel="canonical" href="${ORIGIN}/qr-libre">`);
mustContain("qr-libre h1", product, "<h1");
mustContain("qr-libre status", product, "En construcción");
mustContain("qr-libre limits", product, "no confirma");
mustContain("qr-libre nav prefix", product, 'href="/#herramientas"');
mustNotContain("qr-libre", product, 'href="#herramientas"');

const productBlocks = [...product.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const app = productBlocks.find((b) => b["@type"] === "SoftwareApplication");
if (!app) failures.push("qr-libre: no SoftwareApplication schema");
else {
  if (app.isAccessibleForFree !== true) failures.push("SoftwareApplication.isAccessibleForFree must be true");
  if (!("license" in app)) failures.push("SoftwareApplication needs a license");
  if (app.codeRepository !== "https://github.com/ASSSIE-SAS/qr-libre") failures.push(`SoftwareApplication.codeRepository is ${app.codeRepository}`);
  if ("installUrl" in app) failures.push("SoftwareApplication must omit installUrl while the app is not installable");
}
const productFaq = productBlocks.find((b) => b["@type"] === "FAQPage");
if (!productFaq) failures.push("qr-libre: no FAQPage schema");
else if (productFaq.mainEntity?.length !== 5) failures.push(`qr-libre FAQPage has ${productFaq.mainEntity?.length ?? 0} questions`);
const breadcrumb = productBlocks.find((b) => b["@type"] === "BreadcrumbList");
if (!breadcrumb) failures.push("qr-libre: no BreadcrumbList schema");
else if (breadcrumb.itemListElement?.length !== 2) failures.push("BreadcrumbList must have exactly two ListItems");

mustContain("og image", home, 'property="og:image" content="https://www.asssie.co/og-image.jpg"');
mustContain("twitter image", product, 'name="twitter:image" content="https://www.asssie.co/og-image.jpg"');

// The preview asset must be a real JPEG under WhatsApp's 600 KB cap.
const ogJpg = await readFile(join(DIST, "og-image.jpg")).catch(() => null);
if (!ogJpg) failures.push("dist/og-image.jpg: missing or unreadable");
else {
  if (ogJpg[0] !== 0xff || ogJpg[1] !== 0xd8) failures.push("dist/og-image.jpg: not a JPEG (missing FF D8 signature)");
  if (ogJpg.length >= 600 * 1024) failures.push(`dist/og-image.jpg: ${ogJpg.length} bytes, must be under 600 KB`);
}
mustContain("llms", await readDist("llms.txt"), "/qr-libre");

const sitemap = await readDist("sitemap.xml");
const expectedLocs = [`${ORIGIN}/`, `${ORIGIN}/qr-libre`, `${ORIGIN}/privacidad`, `${ORIGIN}/qr-libre/privacidad`];
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length !== expectedLocs.length) failures.push(`sitemap.xml: expected ${expectedLocs.length} urls, found ${locs.length}`);
for (const loc of expectedLocs) mustContain("sitemap", sitemap, `<loc>${loc}</loc>`);

mustContain("footer privacy link", home, 'href="/privacidad"');
mustContain("app privacy link", product, 'href="/qr-libre/privacidad"');

// Scope the contact assertions to the contact section: the layout's font
// <noscript> in <head> must not be able to satisfy the no-JS fallback check.
const contactStart = home.indexOf('id="contacto"');
const contact = contactStart >= 0 ? home.slice(contactStart) : "";
mustContain("contact whatsapp", contact, "wa.me");
mustContain("contact fallback", contact, "<noscript>");
mustNotContain("contact endpoint", home, 'action="/api/lead"');

if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`ok — ${REQUIRED_ROUTES.length} routes checked, ${pages.size} pages scanned`);
