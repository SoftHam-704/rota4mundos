import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import logger from "../../config/logger.js";
import { gerarRascunhos, publicarProximo, statusAgente } from "./social-agent.service.js";

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

async function carregar(id, res) {
    const post = await prisma.socialPost.findUnique({ where: { id } });
    if (!post) ApiResponse.error(res, "Post não encontrado", 404);
    return post;
}

export const aprovar = asyncHandler(async (req, res) => {
    const post = await carregar(req.params.id, res);
    if (!post) return;
    if (!["DRAFT", "FAILED", "REJECTED"].includes(post.status)) return ApiResponse.error(res, `Não dá para aprovar um post ${post.status}`, 409);
    const atualizado = await prisma.socialPost.update({
        where: { id: post.id },
        data: { status: "APPROVED", approvedAt: new Date(), errorMessage: null, containerId: null },
        include: comArtigo,
    });
    logger.info(`Instagram: post ${post.id} aprovado por ${req.user.email}`);
    return ApiResponse.success(res, atualizado, "Aprovado — sai no próximo horário (12:00 ou 19:00)");
});

export const rejeitar = asyncHandler(async (req, res) => {
    const post = await carregar(req.params.id, res);
    if (!post) return;
    if (["PUBLISHED", "PUBLISHING"].includes(post.status)) return ApiResponse.error(res, "Post já publicado ou publicando", 409);
    const atualizado = await prisma.socialPost.update({ where: { id: post.id }, data: { status: "REJECTED" }, include: comArtigo });
    return ApiResponse.success(res, atualizado, "Rejeitado");
});

export const editarLegenda = asyncHandler(async (req, res) => {
    const post = await carregar(req.params.id, res);
    if (!post) return;
    if (["PUBLISHED", "PUBLISHING"].includes(post.status)) return ApiResponse.error(res, "Post já publicado ou publicando", 409);
    const caption = String(req.body.caption || "").trim();
    if (!caption) return ApiResponse.error(res, "Legenda vazia", 400);
    if (caption.length > 2200) return ApiResponse.error(res, "O Instagram aceita até 2.200 caracteres", 400);
    const atualizado = await prisma.socialPost.update({
        where: { id: post.id },
        data: { caption, reviewNote: `${post.reviewNote || ""}\nLegenda editada manualmente por ${req.user.email}.`.trim() },
        include: comArtigo,
    });
    return ApiResponse.success(res, atualizado, "Legenda atualizada");
});

export const publicarAgora = asyncHandler(async (req, res) => {
    const post = await carregar(req.params.id, res);
    if (!post) return;
    if (post.status !== "APPROVED") return ApiResponse.error(res, "Aprove o post antes de publicar", 409);
    const r = await publicarProximo(post.id);
    return r.publicado
        ? ApiResponse.success(res, r, "Publicado no Instagram")
        : ApiResponse.error(res, `Não publicou: ${r.motivo}`, 502);
});

export const deleteSocialPost = asyncHandler(async (req, res) => {
    const post = await carregar(req.params.id, res);
    if (!post) return;
    if (["PUBLISHED", "PUBLISHING"].includes(post.status)) return ApiResponse.error(res, "Post publicado não é apagado daqui (apague no Instagram)", 409);
    await prisma.socialPost.delete({ where: { id: post.id } });
    return ApiResponse.success(res, null, "Post removido");
});
