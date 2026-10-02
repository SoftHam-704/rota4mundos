// Cliente da API do Instagram (login do Instagram — graph.instagram.com), sem Página do Facebook.
// Permissões do app: instagram_business_basic e instagram_business_content_publish.
//
// O token fica em site_settings (ig_token) e é renovado a cada 7 dias: o token de 60 dias só pode ser
// renovado enquanto válido e com mais de 24h de vida — renovar cedo evita o vencimento, que obrigaria
// a refazer o passo manual no painel da Meta. Na primeira vez, o token vem da variável IG_TOKEN.
import { prisma } from "../../config/database.js";
import logger from "../../config/logger.js";

const API = "https://graph.instagram.com/v23.0";
const RENOVAR_A_CADA_MS = 7 * 24 * 3600 * 1000;
const ESPERA_CONTEINER_MS = 3000;
const MAX_CHECAGENS_CONTEINER = 40; // ~2 minutos

const lerConfig = async (key) => (await prisma.siteSetting.findUnique({ where: { key } }))?.value ?? null;
const gravarConfig = (key, value, description) =>
    prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value, type: "string", description },
    });

export async function obterToken() {
    let token = await lerConfig("ig_token");
    if (!token && process.env.IG_TOKEN) {
        token = process.env.IG_TOKEN;
        await gravarConfig("ig_token", token, "Token do Instagram (renovado automaticamente)");
        await gravarConfig("ig_token_renovado_em", new Date().toISOString(), "Última renovação do token do Instagram");
        logger.info("Instagram: token inicial gravado a partir de IG_TOKEN");
    }
    if (!token) throw new Error("Instagram: sem token — configure IG_TOKEN no servidor");
    return token;
}

class ErroMeta extends Error {
    constructor(dados, contexto) {
        const e = dados?.error || {};
        super(`${contexto}: ${e.message || "erro desconhecido"}${e.code ? ` (código ${e.code}${e.error_subcode ? `/${e.error_subcode}` : ""})` : ""}`);
        this.code = e.code;
        this.tokenInvalido = e.code === 190;
    }
}

async function chamar(metodo, caminho, params, contexto) {
    const token = await obterToken();
    const corpo = new URLSearchParams({ ...params, access_token: token });
    const url = metodo === "GET" ? `${API}${caminho}?${corpo}` : `${API}${caminho}`;
    const resp = await fetch(url, metodo === "GET" ? {} : { method: "POST", body: corpo });
    const dados = await resp.json().catch(() => ({}));
    if (!resp.ok || dados.error) throw new ErroMeta(dados, contexto);
    return dados;
}

export async function conta() {
    const me = await chamar("GET", "/me", { fields: "user_id,username,media_count,followers_count" }, "consultar conta");
    await gravarConfig("ig_user_id", me.user_id, "Id da conta do Instagram");
    return me;
}

async function userId() {
    return (await lerConfig("ig_user_id")) || (await conta()).user_id;
}

export async function cota() {
    const r = await chamar("GET", `/${await userId()}/content_publishing_limit`, { fields: "config,quota_usage" }, "consultar cota");
    const d = r.data?.[0] || {};
    return { usado: d.quota_usage ?? 0, limite: d.config?.quota_total ?? 100 };
}

/** Renova o token se a última renovação tiver mais de 7 dias. Retorna true se renovou. */
export async function renovarTokenSePreciso() {
    const ultima = await lerConfig("ig_token_renovado_em");
    if (ultima && Date.now() - new Date(ultima).getTime() < RENOVAR_A_CADA_MS) return false;
    const token = await obterToken();
    const resp = await fetch(`https://graph.instagram.com/refresh_access_token?${new URLSearchParams({ grant_type: "ig_refresh_token", access_token: token })}`);
    const dados = await resp.json().catch(() => ({}));
    if (!resp.ok || !dados.access_token) throw new ErroMeta(dados, "renovar token");
    await gravarConfig("ig_token", dados.access_token, "Token do Instagram (renovado automaticamente)");
    await gravarConfig("ig_token_renovado_em", new Date().toISOString(), "Última renovação do token do Instagram");
    logger.info(`Instagram: token renovado, válido por mais ${Math.round((dados.expires_in || 0) / 86400)} dias`);
    return true;
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

/** Passo 1: cria o contêiner da imagem. A Meta baixa a imagem da URL pública. */
export async function criarConteiner({ imageUrl, caption }) {
    const r = await chamar("POST", `/${await userId()}/media`, { image_url: imageUrl, caption }, "criar contêiner");
    return r.id;
}

/** Passo 2: espera a Meta terminar de processar a imagem. */
export async function aguardarConteiner(containerId) {
    for (let i = 0; i < MAX_CHECAGENS_CONTEINER; i++) {
        const r = await chamar("GET", `/${containerId}`, { fields: "status_code,status" }, "consultar contêiner");
        if (r.status_code === "FINISHED") return;
        if (r.status_code === "ERROR") throw new Error(`contêiner com erro na Meta: ${r.status || "sem detalhe"}`);
        if (r.status_code === "EXPIRED") throw new Error("contêiner expirou na Meta (passa de 24h sem publicar)");
        await esperar(ESPERA_CONTEINER_MS);
    }
    throw new Error("a Meta não terminou de processar a imagem em 2 minutos");
}

/**
 * Passo 3: publica. Se a chamada falhar, NÃO repete às cegas — a publicação pode ter saído e só a
 * resposta se perdeu. Antes, procura nos posts recentes um com a mesma legenda.
 */
export async function publicarConteiner({ containerId, caption, desde }) {
    try {
        const r = await chamar("POST", `/${await userId()}/media_publish`, { creation_id: containerId }, "publicar");
        return await detalhes(r.id);
    } catch (erro) {
        const existente = await procurarPublicado(caption, desde).catch(() => null);
        if (existente) {
            logger.warn("Instagram: a publicação respondeu com erro, mas o post está no ar — considerado publicado", { erro: erro.message });
            return existente;
        }
        throw erro;
    }
}

async function detalhes(mediaId) {
    const r = await chamar("GET", `/${mediaId}`, { fields: "id,permalink,timestamp" }, "consultar post");
    return { externalId: r.id, permalink: r.permalink, publishedAt: new Date(r.timestamp) };
}

async function procurarPublicado(caption, desde) {
    const r = await chamar("GET", `/${await userId()}/media`, { fields: "id,caption,permalink,timestamp", limit: "5" }, "listar posts");
    const inicio = caption.slice(0, 80);
    const m = (r.data || []).find((p) => (p.caption || "").startsWith(inicio) && new Date(p.timestamp) >= new Date(desde.getTime() - 60_000));
    return m ? { externalId: m.id, permalink: m.permalink, publishedAt: new Date(m.timestamp) } : null;
}
