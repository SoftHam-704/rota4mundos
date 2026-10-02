// Extrai o texto corrido de cada página de cidade do site (JSX) para
// backend/assets/social/cidades/<slug>.txt. É a FONTE que o redator do Instagram pode citar:
// a legenda da série "Cidades da Rota" não pode trazer fato que não esteja aqui.
// O servidor não lê o JSX em tempo de execução — rode este script quando uma página mudar.
//
// Uso (a partir de backend/): node scripts/extract-city-texts.mjs
import fs from "fs";
import path from "path";
import { CIDADES } from "../src/modules/social-posts/content/cidades.js";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const PAGES = path.join(ROOT, "frontend", "src", "pages", "public");
const OUT = path.join(ROOT, "backend", "assets", "social", "cidades");
fs.mkdirSync(OUT, { recursive: true });

const app = fs.readFileSync(path.join(ROOT, "frontend", "src", "App.jsx"), "utf8");
const componente = Object.fromEntries(
    [...app.matchAll(/path: "cidades\/([a-z0-9-]+)",\s*el: <(\w+) \/>/g)].map((m) => [m[1], m[2]])
);
const arquivo = Object.fromEntries(
    [...app.matchAll(/import (\w+) from "\.\/pages\/public\/(\w+)\.jsx"/g)].map((m) => [m[1], m[2]])
);

for (const c of CIDADES) {
    const fonte = fs.readFileSync(path.join(PAGES, `${arquivo[componente[c.slug]]}.jsx`), "utf8");
    const trechos = [
        // literais de string ("..." e `...` sem interpolação)
        ...[...fonte.matchAll(/"((?:[^"\\\n]|\\.){40,})"/g)].map((m) => m[1]),
        ...[...fonte.matchAll(/`([^`$]{40,})`/g)].map((m) => m[1]),
        // texto solto entre tags JSX
        ...[...fonte.matchAll(/>\s*([^<>{}]{40,}?)\s*</g)].map((m) => m[1]),
    ]
        .map((t) => t.replace(/\s+/g, " ").trim())
        .filter((t) => /[a-zà-ú]{3,}/i.test(t) && !/^(https?:|\/|[.#]?[a-z-]+\s*\{)|className|text-|bg-|flex /.test(t));

    const unicos = [...new Set(trechos)];
    const texto = `${c.nome} (${c.pais})\n${c.frase}\n\n${unicos.join("\n")}`.slice(0, 14000);
    fs.writeFileSync(path.join(OUT, `${c.slug}.txt`), texto);
    console.log(`${c.slug.padEnd(22)} ${String(unicos.length).padStart(3)} trechos  ${texto.length} caracteres`);
}
