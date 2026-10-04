import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import logger from "../../config/logger.js";
import { gerarRascunhos, publicarProximo, statusAgente } from "./social-agent.service.js";
import * as fb from "./facebook.client.js";

const comArtigo = { article: { select: { id: true, title: true, slug: true } } };

export const listSocialPosts = asyncHandler(async (req, res) => {
    const { status, platform } = req.query;
    const where = {};
    if (status) where.status = status;
    if (platform) where.platform = platform;

    const posts = await prisma.socialPost.findMany({ where, orderBy: { createdAt: "desc" }, take: 100, include: comArtigo });
    return ApiResponse.success(res, posts);
});

export const statusInstagram = asyncHandler(async (req, res) => {
    return ApiResponse.success(res, { ...(await statusAgente()), gerando });
});

// A geração leva cerca de 1 minuto por post (legenda revisada + arte): roda em segundo plano
// e a tela acompanha pela lista.
let gerando = false;
export const gerarAgora = asyncHandler(async (req, res) => {
    if (gerando) return ApiResponse.success(res, { gerando: true }, "Geração já em andamento");
    gerando = true;
    gerarRascunhos()
        .catch((e) => logger.error("Instagram: geração manual falhou", { erro: e.message }))
        .finally(() => { gerando = false; });
    return ApiResponse.success(res, { gerando: true }, "Gerando rascunhos — eles aparecem na lista em alguns minutos", 202);
});

// As mudanças de status são gravações condicionais (updateMany com o status esperado): vão ao nó
// principal e não dependem da leitura da réplica, que pode estar alguns instantes atrasada.
async function mudarStatus(id, de, dados) {
    const r = await prisma.socialPost.updateMany({ where: { id, status: { in: de } }, data: dados });
    return r.count === 1;
}

async function carregar(id, res) {
    const post = await prisma.socialPost.findUnique({ where: { id } });
    if (!post) ApiResponse.error(res, "Post não encontrado", 404);
    return post;
}

export const aprovar = asyncHandler(async (req, res) => {
    const ok = await mudarStatus(req.params.id, ["DRAFT", "FAILED", "REJECTED"],
        { status: "APPROVED", approvedAt: new Date(), errorMessage: null, containerId: null });
    if (!ok) return ApiResponse.error(res, "Este post não pode ser aprovado agora (já aprovado, publicado ou removido)", 409);
    logger.info(`Instagram: post ${req.params.id} aprovado por ${req.user.email}`);
    return ApiResponse.success(res, null, "Aprovado — sai no próximo horário (12:00 ou 19:00)");
});

export const rejeitar = asyncHandler(async (req, res) => {
    const ok = await mudarStatus(req.params.id, ["DRAFT", "APPROVED", "FAILED"], { status: "REJECTED" });
    if (!ok) return ApiResponse.error(res, "Este post não pode ser rejeitado agora", 409);
    return ApiResponse.success(res, null, "Rejeitado");
});

export const editarLegenda = asyncHandler(async (req, res) => {
    const caption = String(req.body.caption || "").trim();
    if (!caption) return ApiResponse.error(res, "Legenda vazia", 400);
    if (caption.length > 2200) return ApiResponse.error(res, "O Instagram aceita até 2.200 caracteres", 400);
    const ok = await mudarStatus(req.params.id, ["DRAFT", "APPROVED", "FAILED", "REJECTED"], { caption, reviewNote: `Legenda editada manualmente por ${req.user.email}.` });
    if (!ok) return ApiResponse.error(res, "Post já publicado ou publicando", 409);
    return ApiResponse.success(res, null, "Legenda atualizada");
});

export const publicarAgora = asyncHandler(async (req, res) => {
    const post = await carregar(req.params.id, res);
    if (!post) return;
    const r = await publicarProximo(post.id); // só publica se estiver APPROVED (reserva atômica)
    return r.publicado
        ? ApiResponse.success(res, r, "Publicado")
        : ApiResponse.error(res, `Não publicou: ${r.motivo}`, 502);
});

export const deleteSocialPost = asyncHandler(async (req, res) => {
    const post = await carregar(req.params.id, res);
    if (!post) return;
    if (["PUBLISHED", "PUBLISHING"].includes(post.status)) return ApiResponse.error(res, "Post publicado não é apagado daqui (apague na rede social)", 409);
    await prisma.socialPost.delete({ where: { id: post.id } });
    return ApiResponse.success(res, null, "Post removido");
});


// ---------------------------------------------------------------- conexão da Página do Facebook

const TELA_PUBLICACOES = "https://www.rota4mundos.com.br/admin/publicacoes";

/** Admin clicou em "Conectar Facebook": devolve o endereço do diálogo do Facebook. */
export const conectarFacebook = asyncHandler(async (req, res) => {
    try {
        return ApiResponse.success(res, { url: await fb.iniciarConexao(req.user.email) });
    } catch (e) {
        return ApiResponse.error(res, e.message, 400);
    }
});

/** O Facebook devolve o navegador aqui. Conclui e volta para a tela Publicações com o resultado. */
export const retornoFacebook = asyncHandler(async (req, res) => {
    const { code, state, error_description: negado } = req.query;
    const voltar = (params) => res.redirect(`${TELA_PUBLICACOES}?${new URLSearchParams(params)}`);
    if (negado || !code) return voltar({ facebook: "erro", motivo: negado || "autorização cancelada" });
    try {
        const pagina = await fb.concluirConexao({ code: String(code), state: String(state || "") });
        return voltar({ facebook: "ok", pagina: pagina.nome });
    } catch (e) {
        logger.error("Facebook: falha ao conectar", { erro: e.message });
        return voltar({ facebook: "erro", motivo: e.message.slice(0, 200) });
    }
});
