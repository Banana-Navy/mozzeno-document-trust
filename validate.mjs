import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const pages = new Map([
  ["index.html", "home"],
  ["fonctionnement.html", "fonctionnement"],
  ["detecteurs.html", "detecteurs"],
  ["demo.html", "demo"],
  ["architecture.html", "architecture"],
  ["securite.html", "securite"],
  ["gouvernance.html", "gouvernance"],
  ["roadmap.html", "roadmap"],
]);

const failures = [];
let totalBentos = 0;
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

for (const [filename, pageKey] of pages) {
  const path = join(root, filename);
  assert(existsSync(path), `${filename}: fichier absent`);
  if (!existsSync(path)) continue;
  const html = readFileSync(path, "utf8");

  assert(/^<!doctype html>/i.test(html), `${filename}: doctype HTML5 absent`);
  assert(html.includes('<meta charset="utf-8">'), `${filename}: charset absent`);
  assert(html.includes('name="viewport"'), `${filename}: viewport absent`);
  assert(html.includes('http-equiv="Content-Security-Policy"'), `${filename}: CSP locale absente`);
  assert(html.includes(`<body data-page="${pageKey}">`), `${filename}: clé de page incorrecte`);
  assert((html.match(/<title>/g) || []).length === 1, `${filename}: title manquant ou dupliqué`);
  assert((html.match(/<main\b/g) || []).length === 1, `${filename}: main manquant ou dupliqué`);
  assert((html.match(/<\/main>/g) || []).length === 1, `${filename}: fermeture main incorrecte`);
  assert(html.includes("assets/styles.css"), `${filename}: CSS partagé absent`);
  assert(html.includes("assets/app.js"), `${filename}: JavaScript partagé absent`);
  assert(html.includes('rel="icon"'), `${filename}: favicon absent`);
  assert(html.includes("data-site-header"), `${filename}: montage header absent`);
  assert(html.includes("data-site-footer"), `${filename}: montage footer absent`);
  assert(!/<input[^>]+type=["']file["']/i.test(html), `${filename}: upload réel interdit`);
  assert(!/<(?:form|iframe|object|embed)\b/i.test(html), `${filename}: surface active interdite`);

  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert(new Set(ids).size === ids.length, `${filename}: attribut id dupliqué`);

  for (const match of html.matchAll(/<(?:a|link|script|img)\b[^>]*(?:href|src)="([^"]+)"[^>]*>/g)) {
    const reference = match[1];
    if (/^(?:https?:|#|mailto:|tel:)/.test(reference)) continue;
    const target = reference.split("#", 1)[0].split("?", 1)[0];
    if (!target) continue;
    assert(existsSync(join(root, target)), `${filename}: cible locale absente ${reference}`);
  }

  for (const image of html.matchAll(/<img\b([^>]*)>/g)) {
    assert(/\balt="[^"]*"/.test(image[1]), `${filename}: image sans attribut alt`);
  }

  const bentoTags = [...html.matchAll(/<[^>]+\bclass="([^"]+)"[^>]*>/g)].filter((match) =>
    match[1].split(/\s+/).includes("bento"),
  );
  totalBentos += bentoTags.length;
  assert(
    bentoTags.every((match) => /\bdata-reveal\b/.test(match[0])),
    `${filename}: chaque bento doit conserver son animation d'apparition`,
  );
}

assert(totalBentos === 26, `showcase: 26 bentos attendus, ${totalBentos} trouvés`);

const app = readFileSync(join(root, "assets/app.js"), "utf8");
const css = readFileSync(join(root, "assets/styles.css"), "utf8");
const visualKit = join(root, "assets/illustrations/separation-visual-kit.png");
assert(!/@import\s+url\(/i.test(css), "styles.css: import réseau interdit");
assert(!/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon)\b/.test(app), "app.js: primitive réseau interdite");
assert(!/(?:mailto:|tel:)/i.test(app), "app.js: contact personnel interdit");
assert(/rel="noopener noreferrer"/.test(app), "app.js: lien externe sans isolation explicite");
assert((css.match(/{/g) || []).length === (css.match(/}/g) || []).length, "styles.css: accolades déséquilibrées");
assert(app.includes("function setupBentoMotion()"), "app.js: orchestration bento responsive absente");
assert(app.includes('classList.toggle("is-inview"'), "app.js: animation bento au défilement absente");
assert(app.includes('classList.add("is-touch-active"'), "app.js: retour tactile bento absent");
assert(app.includes('addEventListener("pointerout"'), "app.js: repli pointerout absent");
assert(app.includes("cancelAnimationFrame"), "app.js: annulation du tilt différé absente");
assert(!app.includes("setupTilt"), "app.js: ancien tilt non responsive encore présent");
assert(
  css.includes("--section-edge-space: clamp(0.75rem, 1.2vw, 1rem)"),
  "styles.css: plafond cumulé de 2rem entre sections absent",
);
for (const animationName of [
  "mobile-bento-glow",
  "mobile-pipeline-pulse",
  "separation-transfer-mobile",
  "mobile-arch-node-pulse",
]) {
  assert(css.includes(`@keyframes ${animationName}`), `styles.css: animation mobile absente ${animationName}`);
}
assert(
  css.includes("animation-play-state: paused") && css.includes('[data-visible="true"]'),
  "styles.css: démarrage des animations avant visibilité",
);
assert(css.includes("@media (max-width: 360px)"), "styles.css: adaptation aux écrans de 320px absente");
assert(existsSync(visualKit), "assets: planche visuelle de séparation absente");
assert(css.includes('url("illustrations/separation-visual-kit.png")'), "styles.css: planche visuelle non référencée localement");
for (const filename of pages.keys()) {
  assert(app.includes(`"${filename}"`), `app.js: navigation absente pour ${filename}`);
}

const demo = readFileSync(join(root, "demo.html"), "utf8");
assert((demo.match(/data-demo-scenario=/g) || []).length === 5, "demo.html: cinq scénarios synthétiques attendus");

const home = readFileSync(join(root, "index.html"), "utf8");
assert(home.includes("Illustration · scénario synthétique"), "index.html: marquage synthétique du hero absent");
assert(home.includes("WARNING · revue requise"), "index.html: contrat WARNING vers revue absent");
assert(home.includes('id="separation-moteur-humain"'), "index.html: frontière moteur-humain absente");
assert(home.includes("Le moteur<br>ne décide pas"), "index.html: limite de décision du moteur absente");
assert(!home.includes("Signature SHA-256"), "index.html: SHA-256 ne doit pas être présenté comme une signature");
assert(!/trust-console[^>]+role="img"/.test(home), "index.html: la console ne doit pas masquer son contenu sémantique");
assert(!/document-scan[^;{]*infinite|console-runner[^;{]*infinite|separation-transfer[^;{]*infinite/.test(css), "styles.css: animation illustrative longue et infinie");
for (const iconId of ["i-document", "i-clipboard", "i-user", "i-database", "i-lock", "i-user-lock"]) {
  assert(app.includes(`id="${iconId}"`), `app.js: pictogramme local absent ${iconId}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Showcase validé: ${pages.size} pages, liens et assets locaux cohérents.`);
}
