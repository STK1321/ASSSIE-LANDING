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

const ATTR = 'href="(#[^"]+|/[^"]*)"';
// Task 5 empties this list once the redesign sections land.
const PENDING_IDS = ["que-hacemos", "herramientas", "prueba"];
const anchors = [...home.matchAll(new RegExp(ATTR, "g"))].map((m) => m[1]);
for (const href of anchors) {
  if (href.startsWith("#")) {
    const id = href.slice(1);
    if (!home.includes(`id="${id}"`) && id !== "" && !PENDING_IDS.includes(id)) failures.push(`index.html: ${href} has no target`);
  }
}
const h1s = (home.match(/<h1/g) || []).length;
if (h1s !== 1) failures.push(`index.html: expected 1 h1, found ${h1s}`);
mustContain("hero headline", home, "Herramientas para el trabajo real");
mustContain("hero tools cta", home, 'href="#herramientas"');
mustNotContain("index.html", home, 'href="#seo"');
mustNotContain("index.html", home, "Enfoque");

mustNotContain("index.html", home, "hola@");

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
