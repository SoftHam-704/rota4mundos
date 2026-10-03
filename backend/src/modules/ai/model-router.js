// Roteador de modelos: qual modelo atende cada operação de IA do RotaBio — e a reserva se ele falhar.
//
// Regra da casa (definida pelo dono em 02/10/2026):
//   DeepSeek → trabalho em volume e pesquisa longa
//   Claude   → tarefas que exigem robustez e julgamento (a voz da marca)
//   JEV      → classificação (modelo de decisão tipado da TypeSafe)
//   Gemini   → geração de imagens (família "Nano Banana")
//
// Trocar o modelo de uma operação sem mexer em código: variável de ambiente
//   MODELO_<OPERACAO> = "provedor:modelo"
//   ex.: MODELO_NOTICIAS_REDACAO=deepseek:deepseek-v4-pro
//        MODELO_INSTAGRAM_IMAGEM=gemini:gemini-3-pro-image
import Anthropic from "@anthropic-ai/sdk";
import logger from "../../config/logger.js";

export const ROTAS = {
    // Redação das reportagens da coleta diária e da recuperação: volume → DeepSeek
    "noticias.redacao": {
        provedor: "deepseek", modelo: "deepseek-flash", maxTokens: 4000,
        reserva: { provedor: "anthropic", modelo: "claude-haiku-4-5-20251001", maxTokens: 1400 },
    },
    // "Esta notícia é da Rota?" — classificação → JEV
    "noticias.triagem": { provedor: "jev", modelo: "jev-1.13.0" },
    // Legenda do Instagram e sua revisão: voz da marca → Claude
    "instagram.legenda": { provedor: "anthropic", modelo: "claude-opus-5-5", effort: "medium" },
    "instagram.revisao": { provedor: "anthropic", modelo: "claude-opus-5-5", effort: "low" },
    // Fundo ilustrativo das artes de reportagem → Gemini (Nano Banana 2); sem ele, a foto da ponte
    "instagram.imagem": { provedor: "gemini", modelo: "gemini-3.1-flash-image", aspecto: "4:5" },
};

/** Configuração efetiva de uma operação, já com a troca por variável de ambiente aplicada. */
export function rota(operacao) {
    const base = ROTAS[operacao];
    if (!base) throw new Error(`roteador: operação desconhecida "${operacao}"`);
    const troca = process.env[`MODELO_${operacao.replace(/\./g, "_").toUpperCase()}`];
    if (!troca) return base;
    const [provedor, ...resto] = troca.split(":");
    return { ...base, provedor, modelo: resto.join(":") };
}

// ---------------------------------------------------------------- provedores

let _anthropic;
const anthropic = () => (_anthropic ??= new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }));

async function textoDeepSeek(cfg, prompt, { json }) {
    if (!process.env.DEEPSEEK_API_KEY) throw new Error("DEEPSEEK_API_KEY ausente");
    const r = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            model: cfg.modelo,
            max_tokens: cfg.maxTokens ?? 4000, // os modelos do DeepSeek raciocinam antes, e isso conta no limite
            ...(json && { response_format: { type: "json_object" } }),
            messages: [{ role: "user", content: prompt }],
        }),
        signal: AbortSignal.timeout(90000),
    });
    const j = await r.json().catch(() => ({}));
    const escolha = j.choices?.[0];
    if (!r.ok) throw new Error(`DeepSeek HTTP ${r.status}: ${JSON.stringify(j.error || j).slice(0, 200)}`);
    if (escolha?.finish_reason !== "stop") throw new Error(`DeepSeek terminou com "${escolha?.finish_reason}" (resposta cortada)`);
    return escolha.message.content;
}

async function textoAnthropic(cfg, prompt) {
    const msg = await anthropic().messages.create({
        model: cfg.modelo,
        max_tokens: cfg.maxTokens ?? 1400,
        messages: [{ role: "user", content: prompt }],
    });
    return msg.content.find((b) => b.type === "text")?.text || "";
}

const TEXTO = { deepseek: textoDeepSeek, anthropic: textoAnthropic };

/**
 * Texto livre para uma operação. Se o provedor principal falhar, usa a reserva da rota.
 * (As legendas do Instagram usam saída estruturada do Claude e chamam o SDK direto, com a
 * configuração vinda de rota("instagram.legenda") — ver caption.service.js.)
 */
export async function gerarTexto(operacao, prompt, opcoes = {}) {
    const cfg = rota(operacao);
    for (const alvo of [cfg, cfg.reserva].filter(Boolean)) {
        const fn = TEXTO[alvo.provedor];
        if (!fn) { logger.error(`roteador: provedor de texto "${alvo.provedor}" não suportado`); continue; }
        try {
            return await fn(alvo, prompt, opcoes);
        } catch (e) {
            logger.warn(`roteador: ${operacao} falhou em ${alvo.provedor}:${alvo.modelo}${alvo === cfg && cfg.reserva ? " — tentando a reserva" : ""}`, { erro: e.message });
        }
    }
    throw new Error(`roteador: nenhum provedor atendeu ${operacao}`);
}

/** Decisão tipada (JEV): retorna as respostas por pergunta — { choice, confidence, probabilities }. */
export async function classificar(operacao, { estado, perguntas }) {
    const cfg = rota(operacao);
    if (cfg.provedor !== "jev") throw new Error(`roteador: ${operacao} espera provedor jev, veio ${cfg.provedor}`);
    if (!process.env.JEV_API_KEY) throw new Error("JEV_API_KEY ausente");
    const r = await fetch("https://api.typesafe.ai/v1/systemone", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.JEV_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: cfg.modelo, state: estado, questions: perguntas }),
        signal: AbortSignal.timeout(15000),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(`JEV HTTP ${r.status}: ${JSON.stringify(j).slice(0, 200)}`); e.status = r.status; throw e; }
    return { respostas: j.answers || {}, tokens: j.usage?.input_tokens ?? 0 };
}

/**
 * Imagem para uma operação (Gemini). Retorna Buffer ou null — quem chama decide o substituto
 * (nas artes de reportagem, a foto da ponte). Falhar aqui nunca derruba a geração do post.
 */
export async function gerarImagem(operacao, prompt) {
    const cfg = rota(operacao);
    if (cfg.provedor !== "gemini") { logger.error(`roteador: provedor de imagem "${cfg.provedor}" não suportado`); return null; }
    if (!process.env.GEMINI_API_KEY) { logger.warn("roteador: GEMINI_API_KEY ausente — sem imagem gerada"); return null; }
    try {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${cfg.modelo}:generateContent`, {
            method: "POST",
            headers: { "x-goog-api-key": process.env.GEMINI_API_KEY, "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: cfg.aspecto || "4:5" } },
            }),
            signal: AbortSignal.timeout(120000),
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(`Gemini HTTP ${r.status}: ${JSON.stringify(j.error || j).slice(0, 200)}`);
        const parte = (j.candidates?.[0]?.content?.parts || []).find((p) => p.inlineData?.data);
        if (!parte) throw new Error(`Gemini não devolveu imagem (motivo: ${j.candidates?.[0]?.finishReason || "?"})`);
        return Buffer.from(parte.inlineData.data, "base64");
    } catch (e) {
        logger.warn(`roteador: ${operacao} sem imagem (${cfg.modelo})`, { erro: e.message });
        return null;
    }
}
