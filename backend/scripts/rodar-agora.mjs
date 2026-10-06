// Roda um agente AGORA, exatamente como o agendador faria — inclusive o registro em agent_runs,
// para o Guardião ver a rodada. Para refazer uma rodada que falhou (ex.: crédito da Anthropic
// esgotado em 06/10/2026) sem esperar o horário do dia seguinte.
//
// Uso (no servidor, em backend/): node scripts/rodar-agora.mjs historiador|rascunhos
import { registrarRodada } from "../src/modules/saude/saude.service.js";

const AGENTES = {
    historiador: async () => ["historiador", (await import("../src/jobs/historiadorJob.js")).rodadaHistoriador],
    rascunhos: async () => ["instagram_rascunhos", (await import("../src/jobs/socialJob.js")).rodadaRascunhos],
};

const qual = process.argv[2];
if (!AGENTES[qual]) {
    console.error(`uso: node scripts/rodar-agora.mjs ${Object.keys(AGENTES).join("|")}`);
    process.exit(1);
}
const [id, rodada] = await AGENTES[qual]();
const fim = await registrarRodada(id, rodada);
console.log(`${id}: ${fim.resultado}${fim.detalhe ? ` — ${fim.detalhe}` : ""}${fim.erro ? ` — erro: ${fim.erro}` : ""}`);
process.exit(fim.resultado === "FALHOU" ? 1 : 0);
