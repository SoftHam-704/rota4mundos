// Roda uma rodada do Agente Historiador manualmente.
//
// Uso (a partir de backend/):
//   node scripts/historiador.mjs --seco                          (simula: pesquisa, classifica, verifica; não grava)
//   node scripts/historiador.mjs --seco --cidade bonito --tema culinaria
//   node scripts/historiador.mjs                                 (grava pauta + rascunho de artigo + rascunho de post)
import "dotenv/config";
import fs from "fs";

// chaves que só existem no .env da raiz (JEV) — não sobrescreve as do backend/.env
try {
    for (const l of fs.readFileSync("../.env", "utf8").split(/\r?\n/)) {
        const m = l.match(/^(JEV_API_KEY|DEEPSEEK_API_KEY|GEMINI_API_KEY)\s*=\s*"?([^"\r\n]+)/);
        if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
} catch { /* sem .env na raiz */ }

const { executarHistoriador } = await import("../src/modules/historiador/historiador.service.js");
const { criarPostDeHistoria } = await import("../src/modules/social-posts/social-agent.service.js");

const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : undefined; };
const seco = process.argv.includes("--seco");
const t0 = Date.now();
const r = await executarHistoriador({ seco, cidadeSlug: arg("cidade"), tema: arg("tema"), criarPost: criarPostDeHistoria });
console.log(JSON.stringify({ ...r, segundos: Math.round((Date.now() - t0) / 1000) }, null, 1));
process.exit(0);
