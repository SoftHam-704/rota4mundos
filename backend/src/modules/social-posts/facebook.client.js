// Cliente da Página do Facebook do Rota 4 Mundos (Graph API com token de PÁGINA).
//
// O cliente do Instagram (instagram.client.js) usa o login do Instagram, que não enxerga Páginas;
// por isso o Facebook tem a sua própria conexão. Ela é feita UMA vez pelo administrador da Página,
// no botão "Conectar Facebook" da tela Publicações: o Facebook pede login e autorização, o retorno
// cai no servidor (concluirConexao) e o token da Página é gravado em site_settings. Nenhuma senha
// ou token passa por chat, log ou repositório.
//
// O token de Página obtido a partir de um token de usuário de longa duração NÃO expira (só cai se a
// senha mudar, o app perder a permissão ou o administrador sair da Página) — aí basta reconectar.
//
// Variáveis do servidor: FB_APP_ID e FB_APP_SECRET (do app na Meta). Opcional: FB_PAGE_ID, para
// escolher a Página quando o administrador gerencia mais de uma.
// Permissões pedidas: pages_show_list, pages_read_engagement, pages_manage_posts.
import crypto from "crypto";
import { prisma } from "../../config/database.js";
import { env } from "../../config/env.js";
import logger from "../../config/logger.js";

const VERSAO = "v23.0";
const API = `https://graph.facebook.com/${VERSAO}`;
const PERMISSOES = ["pages_show_list", "pages_read_engagement", "pages_manage_posts"];
const VALIDADE_STATE_MS = 15 * 60 * 1000;

const lerConfig = async (key) => (await prisma.siteSetting.findUnique({ where: { key } }))?.value ?? null;
const gravarConfig = (key, value, description) =>
    prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value, type: "string", description },
    });

export const urlRetorno = () => `${env.APP_BASE_URL}/api/social-posts/facebook/retorno`;
export const appConfigurado = () => Boolean(process.env.FB_APP_ID && process.env.FB_APP_SECRET);

class ErroFacebook extends Error {
    constructor(dados, contexto) {
        const e = dados?.error || {};
        super(`${contexto}: ${e.message || "erro desconhecido"}${e.code ? ` (código ${e.code}${e.error_subcode ? `/${e.error_subcode}` : ""})` : ""}`);
        this.code = e.code;
        this.tokenInvalido = e.code === 190;
    }
}

async function graph(metodo, caminho, params, contexto) {
    const corpo = new URLSearchParams(params);
    const url = metodo === "GET" ? `${API}${caminho}?${corpo}` : `${API}${caminho}`;
    const resp = await fetch(url, metodo === "GET" ? {} : { method: "POST", body: corpo });
    const dados = await resp.json().catch(() => ({}));
    if (!resp.ok || dados.error) throw new ErroFacebook(dados, contexto);
    return dados;
}

// ---------------------------------------------------------------- conexão (uma vez)

/**
 * Passo 1 da conexão: devolve o endereço do diálogo do Facebook. O `state` (aleatório, 15 min,
 * uso único) amarra o retorno a quem clicou no admin — o retorno não tem login próprio.
 */
export async function iniciarConexao(email) {
    if (!appConfigurado()) throw new Error("faltam FB_APP_ID e FB_APP_SECRET no servidor");
    const state = crypto.randomBytes(24).toString("hex");
    await gravarConfig("fb_state", JSON.stringify({ state, email, ate: Date.now() + VALIDADE_STATE_MS }), "Conexão do Facebook em andamento");
    return `https://www.facebook.com/${VERSAO}/dialog/oauth?${new URLSearchParams({
        client_id: process.env.FB_APP_ID,
        redirect_uri: urlRetorno(),
        state,
        scope: PERMISSOES.join(","),
        response_type: "code",
    })}`;
}

/** Passo 2: o Facebook devolveu `code`. Troca por token de Página e grava. Retorna a Página. */
export async function concluirConexao({ code, state }) {
    const salvo = JSON.parse((await lerConfig("fb_state")) || "null");
    await gravarConfig("fb_state", "", "Conexão do Facebook em andamento"); // uso único
    if (!salvo || salvo.state !== state || Date.now() > salvo.ate) throw new Error("pedido de conexão inválido ou expirado — clique em Conectar Facebook de novo");

    const app = { client_id: process.env.FB_APP_ID, client_secret: process.env.FB_APP_SECRET };
    const curto = await graph("GET", "/oauth/access_token", { ...app, redirect_uri: urlRetorno(), code }, "trocar o código");
    const longo = await graph("GET", "/oauth/access_token", { ...app, grant_type: "fb_exchange_token", fb_exchange_token: curto.access_token }, "token de longa duração");
    const contas = await graph("GET", "/me/accounts", { fields: "id,name,access_token,tasks", limit: "50", access_token: longo.access_token }, "listar Páginas");

    const paginas = (contas.data || []).filter((p) => (p.tasks || []).includes("CREATE_CONTENT") || !p.tasks);
    const escolhida =
        paginas.find((p) => p.id === process.env.FB_PAGE_ID) ||
        (paginas.length === 1 ? paginas[0] : paginas.find((p) => /rota/i.test(p.name)));
    if (!escolhida) {
        const nomes = paginas.map((p) => p.name).join(", ") || "nenhuma";
        throw new Error(`não achei a Página da Rota entre as autorizadas (${nomes}). Marque a Página na autorização ou defina FB_PAGE_ID.`);
    }

    await gravarConfig("fb_page_token", escolhida.access_token, "Token da Página do Facebook (não expira)");
    await gravarConfig("fb_page_id", escolhida.id, "Id da Página do Facebook");
    await gravarConfig("fb_page_nome", escolhida.name, "Nome da Página do Facebook");
    await gravarConfig("fb_conectado_em", new Date().toISOString(), "Quando a Página do Facebook foi conectada");
    logger.info(`Facebook: Página conectada — ${escolhida.name} (${escolhida.id}) por ${salvo.email}`);
    return { id: escolhida.id, nome: escolhida.name };
}

export async function conectado() {
    return Boolean((await lerConfig("fb_page_token")) && (await lerConfig("fb_page_id")));
}

async function pagina() {
    const [token, id] = [await lerConfig("fb_page_token"), await lerConfig("fb_page_id")];
    if (!token || !id) throw new Error("Facebook não conectado — use Conectar Facebook na tela Publicações");
    return { token, id };
}

/** Situação para a tela Publicações. Nunca lança: o erro volta no campo `erro`. */
export async function status() {
    const base = { appConfigurado: appConfigurado(), conectado: false, conectadoEm: await lerConfig("fb_conectado_em") };
    if (!(await conectado())) return base;
    try {
        const { token, id } = await pagina();
        const p = await graph("GET", `/${id}`, { fields: "name,link,followers_count", access_token: token }, "consultar Página");
        return { ...base, conectado: true, pagina: { id, nome: p.name, link: p.link, seguidores: p.followers_count ?? null } };
    } catch (e) {
        return { ...base, conectado: false, erro: e.message, reconectar: e.tokenInvalido === true };
    }
}

// ---------------------------------------------------------------- publicação

/**
 * Publica a arte com a legenda na Página. Se a chamada falhar, NÃO repete às cegas — o post pode
 * ter saído e só a resposta se perdeu. Antes, procura nos posts recentes um com a mesma legenda.
 */
export async function publicarFoto({ imageUrl, caption, desde }) {
    const { token, id } = await pagina();
    try {
        const r = await graph("POST", `/${id}/photos`, { url: imageUrl, caption, published: "true", access_token: token }, "publicar foto");
        return await detalhes(r.post_id || r.id, token);
    } catch (erro) {
        const existente = await procurarPublicado(caption, desde, { token, id }).catch(() => null);
        if (existente) {
            logger.warn("Facebook: a publicação respondeu com erro, mas o post está no ar — considerado publicado", { erro: erro.message });
            return existente;
        }
        throw erro;
    }
}

async function detalhes(postId, token) {
    const r = await graph("GET", `/${postId}`, { fields: "id,permalink_url,created_time", access_token: token }, "consultar post");
    return { externalId: r.id, permalink: r.permalink_url, publishedAt: new Date(r.created_time) };
}

async function procurarPublicado(caption, desde, { token, id }) {
    const r = await graph("GET", `/${id}/published_posts`, { fields: "id,message,permalink_url,created_time", limit: "5", access_token: token }, "listar posts");
    const inicio = caption.slice(0, 80);
    const m = (r.data || []).find((p) => (p.message || "").startsWith(inicio) && new Date(p.created_time) >= new Date(desde.getTime() - 60_000));
    return m ? { externalId: m.id, permalink: m.permalink_url, publishedAt: new Date(m.created_time) } : null;
}
