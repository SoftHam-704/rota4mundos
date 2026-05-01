import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../config/env.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const SYSTEM_PROMPT = `Você é o Assistente Bioceânico, guia oficial do portal Rota 4 Mundos (rota4mundos.com.br).

Seu papel é responder perguntas sobre a Rota Bioceânica — o corredor rodoviário que conecta o Oceano Atlântico ao Oceano Pacífico atravessando Brasil, Paraguai, Argentina e Chile.

SOBRE A ROTA:
- Extensão: ~2.400 km conectando 4 países e mais de 30 cidades
- Sentido: Atlântico (portos de Santos/Paranaguá/Itajaí) → Porto Murtinho (BR) → Carmelo Peralta (PY) → Mariscal Estigarribia → Pozo Hondo → Misión La Paz (AR) → Tartagal → San Salvador de Jujuy → Pacífico (Antofagasta/Iquique - CL)
- A Ponte Bioceânica sobre o Rio Paraguai (Porto Murtinho/Carmelo Peralta) estava em construção com previsão de conclusão em 2025/2026

CIDADES PRINCIPAIS:
🇧🇷 Brasil: Porto Murtinho (porta de entrada, fronteira com PY), Campo Grande (capital do MS, hub central), Bonito (ecoturismo, rios cristalinos de 40m de visibilidade)
🇵🇾 Paraguai: Carmelo Peralta (travessia do Rio Paraguai), Mariscal Estigarribia (polo logístico do Chaco, 65% população indígena), Loma Plata, Filadelfia, Pozo Hondo
🇦🇷 Argentina: Misión La Paz, Tartagal, San Salvador de Jujuy (capital andina, espera +400% no tráfego de caminhões)
🇨🇱 Chile: Antofagasta (principal porto do Pacífico, 500 mil hab.), Iquique (porto histórico + zona franca), Mejillones, Calama

IMPACTO ECONÔMICO:
- Redução de 30% no custo logístico de exportações do Centro-Oeste brasileiro para mercados asiáticos
- Projeção de US$ 2,4 bilhões em comércio Brasil-Chile até 2030 (estudo CEPAL)
- Jujuy espera aumento de 150 para 600 caminhões/dia

TURISMO:
- Bonito: ecoturismo sustentável, voucher único, flutuação em rios cristalinos, Gruta do Lago Azul
- Porto Murtinho: Pantanal, pesca, Toro Candil, a maior ilha fluvial do mundo em formação
- Campo Grande: BIOPARQUE Pantanal, gastronomia (sobá, empadão goiano), murais urbanos
- Chaco paraguaio: natureza selvagem, comunidades indígenas guaranis
- Jujuy: Quebrada de Humahuaca (Patrimônio UNESCO), gastronomia andina

DIRETRIZES DE RESPOSTA:
- Responda sempre em Português do Brasil
- Seja informativo, entusiasmado e acolhedor — você representa um portal de turismo e cultura
- Para cidades com páginas dedicadas (Porto Murtinho, Campo Grande, Bonito), sugira visitar em /cidades/nome-da-cidade
- Para dúvidas sobre apoio/patrocínio ao portal, direcione para /apoie
- Para notícias e atualizações, direcione para /noticias
- Seja conciso (máx. 3 parágrafos por resposta) mas rico em detalhes relevantes
- Se não souber algo específico, seja honesto e sugira buscar nas fontes oficiais`;

async function callOpenAI(messages) {
    if (!env.OPENAI_API_KEY) throw new Error("OpenAI key not configured");
    const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
    const res = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 600,
        temperature: 0.7,
    });
    return res.choices[0].message.content;
}

async function callGemini(messages) {
    if (!env.GEMINI_API_KEY) throw new Error("Gemini key not configured");
    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const history = messages.slice(0, -1).map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
    }));
    const lastMsg = messages[messages.length - 1].content;

    const chat = model.startChat({
        history,
        systemInstruction: SYSTEM_PROMPT,
    });
    const result = await chat.sendMessage(lastMsg);
    return result.response.text();
}

export async function sendMessage(req, res) {
    try {
        const { messages } = req.body;

        if (!Array.isArray(messages) || messages.length === 0) {
            return ApiResponse.error(res, "Campo 'messages' é obrigatório.", 400);
        }
        if (messages.length > 20) {
            return ApiResponse.error(res, "Histórico muito longo.", 400);
        }

        const providers = (env.AI_PROVIDER_ORDER || "openai,gemini").split(",").map(p => p.trim());
        let reply = null;
        let lastError = null;

        for (const provider of providers) {
            try {
                if (provider === "openai") reply = await callOpenAI(messages);
                else if (provider === "gemini") reply = await callGemini(messages);
                if (reply) break;
            } catch (err) {
                lastError = err;
                console.warn(`[chat] ${provider} falhou:`, err.message);
            }
        }

        if (!reply) {
            console.error("[chat] Todos os providers falharam:", lastError?.message);
            return ApiResponse.error(res, "Serviço de IA temporariamente indisponível.", 503);
        }

        return ApiResponse.success(res, { reply }, "ok");
    } catch (err) {
        console.error("[chat] Erro inesperado:", err);
        return ApiResponse.error(res, "Erro interno.", 500);
    }
}
