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
