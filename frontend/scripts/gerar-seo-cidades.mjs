// Extrai das páginas de cidade (JSX, pt/es/en) o que buscadores e IAs precisam ler:
// nome, país, região, frase, foto e o texto corrido. Grava public/seo/cidades.json, que o
// index.php do cPanel usa para entregar cada página de cidade já com título, descrição,
// prévia de compartilhamento e texto — sem depender de JavaScript (o site é SPA).
//
// Roda sozinho antes de cada build (package.json → "build"). Mesma heurística de texto de
// backend/scripts/extract-city-texts.mjs (série do Instagram).
import fs from "fs";
import path from "path";
// ordem da travessia, nomes e frases revisados: a mesma lista da série do Instagram
import { CIDADES } from "../../backend/src/modules/social-posts/content/cidades.js";

const FRONT = path.resolve(import.meta.dirname, "..");
const PAGES = path.join(FRONT, "src", "pages", "public");
const app = fs.readFileSync(path.join(FRONT, "src", "App.jsx"), "utf8");

const arquivo = Object.fromEntries(
    [...app.matchAll(/import (\w+) from "\.\/pages\/public\/(\w+)\.jsx"/g)].map((m) => [m[1], m[2]])
);
const pt = Object.fromEntries([...app.matchAll(/path: "cidades\/([a-z0-9-]+)",\s*el: <(\w+) \/>/g)].map((m) => [m[1], m[2]]));
const sobrescritas = (sufixo) => Object.fromEntries(
    [...app.matchAll(new RegExp(`r\\.path === "cidades\\/([a-z0-9-]+)"\\)\\s*return \\{ \\.\\.\\.r, el: <(\\w+${sufixo}) \\/>`, "g"))].map((m) => [m[1], m[2]])
);
const COMPONENTES = { pt, es: sobrescritas("Es"), en: sobrescritas("En") };

const prop = (fonte, nome) => fonte.match(new RegExp(`\\b${nome}="([^"]+)"`))?.[1] || null;

function textoCorrido(fonte) {
    const trechos = [
        ...[...fonte.matchAll(/"((?:[^"\\\n]|\\.){60,})"/g)].map((m) => m[1]),
        ...[...fonte.matchAll(/`([^`$]{60,})`/g)].map((m) => m[1]),
        ...[...fonte.matchAll(/>\s*([^<>{}]{60,}?)\s*</g)].map((m) => m[1]),
    ]
        .map((t) => t.replace(/\\"/g, '"').replace(/\s+/g, " ").trim())
        .filter((t) => /[a-zà-ú]{3,}/i.test(t) && /[.!?]$/.test(t) && !/^(https?:|\/|[.#]?[a-z-]+\s*\{)|className|text-|bg-|flex /.test(t));
    return [...new Set(trechos)];
}

const saida = Object.fromEntries(CIDADES.map((c) => [c.slug, {}]));
const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-");
let total = 0;
for (const [lang, mapa] of Object.entries(COMPONENTES)) {
    for (const [slug, comp] of Object.entries(mapa)) {
        const fonte = fs.readFileSync(path.join(PAGES, `${arquivo[comp]}.jsx`), "utf8");
        const nome = fonte.match(/name=\{\{\s*first:\s*"([^"]+)"(?:,\s*second:\s*"([^"]*)")?/);
        const paragrafos = [];
        let tamanho = 0;
        for (const p of textoCorrido(fonte)) {
            if (tamanho > 6000) break;
            paragrafos.push(p);
            tamanho += p.length;
        }
        const oficial = CIDADES.find((c) => c.slug === slug);
        // name={{ first, second }}: "Porto"+"Murtinho" é o nome; "Salta"+"La Linda" é nome + apelido
        const juntos = [nome?.[1], nome?.[2]].filter(Boolean).join(" ");
        const segundaEhNome = nome?.[2] && slug.startsWith(norm(juntos));
        (saida[slug] ??= {})[lang] = {
            nome: oficial?.nome || (segundaEhNome ? juntos : nome?.[1]) || slug,
            apelido: segundaEhNome ? null : nome?.[2] || null,
            pais: prop(fonte, "country"),
            regiao: prop(fonte, "region"),
            frase: (lang === "pt" && oficial?.frase) || prop(fonte, "tagline"),
            imagem: prop(fonte, "image"),
            paragrafos,
        };
        total++;
    }
}

const destino = path.join(FRONT, "public", "seo");
fs.mkdirSync(destino, { recursive: true });
fs.writeFileSync(path.join(destino, "cidades.json"), JSON.stringify(saida));
const faltando = Object.entries(saida).filter(([, l]) => Object.keys(l).length < 3).map(([s]) => s);
console.log(`seo: ${Object.keys(saida).length} cidades, ${total} páginas${faltando.length ? ` — sem as 3 línguas: ${faltando.join(", ")}` : ""}`);
