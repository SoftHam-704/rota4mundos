import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import logger from "../../config/logger.js";

export const createArticle = asyncHandler(async (req, res) => {
    const { title, slug, excerpt, content, categoryId, tags, status, scheduledFor, lang, metaTitle, metaDesc } = req.body;

    const article = await prisma.article.create({
        data: {
            title,
            slug,
            excerpt,
            content,
            status,
            scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
            publishedAt: status === "PUBLISHED" ? new Date() : null,
            authorId: req.user.id,
            categoryId,
            lang,
            metaTitle,
            metaDesc,
            tags: tags?.length ? { create: tags.map((tagId) => ({ tagId })) } : undefined,
        },
        include: { author: { select: { id: true, name: true } }, category: true, tags: { include: { tag: true } } },
    });

    logger.info("Artigo criado", { articleId: article.id, userId: req.user.id });
    return ApiResponse.success(res, article, "Artigo criado com sucesso", 201);
});

export const listArticles = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search, category, status = "PUBLISHED", lang = "pt", tag } = req.query;
    const skip = (page - 1) * limit;

    const where = { status, lang };
    if (search) where.OR = [{ title: { contains: search, mode: "insensitive" } }, { excerpt: { contains: search, mode: "insensitive" } }];
    if (category) where.categoryId = category;
    if (tag) where.tags = { some: { tag: { slug: tag } } };

    const [articles, totalItems] = await Promise.all([
        prisma.article.findMany({
            where,
            skip, take: limit,
            orderBy: { publishedAt: "desc" },
            include: {
                author: { select: { id: true, name: true } },
                category: true,
                tags: { include: { tag: true } },
                _count: { select: { comments: true } },
            },
        }),
        prisma.article.count({ where }),
    ]);

    return ApiResponse.paginated(res, articles, { page: +page, limit: +limit, totalItems });
});

export const getArticleBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const article = await prisma.article.findUnique({
        where: { slug },
        include: {
            author: { select: { id: true, name: true, avatarUrl: true } },
            category: true,
            tags: { include: { tag: true } },
            comments: { where: { status: "APPROVED" }, include: { user: { select: { name: true, avatarUrl: true } } } },
        },
    });

    if (!article) return ApiResponse.error(res, "Artigo não encontrado", 404);

    // Incrementa contador de visualizações
    await prisma.article.update({ where: { id: article.id }, data: { viewCount: { increment: 1 } } });

    return ApiResponse.success(res, article);
});

export const updateArticle = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) return ApiResponse.error(res, "Artigo não encontrado", 404);

    const { tags, ...data } = req.body;
    const article = await prisma.article.update({
        where: { id },
        data: {
            ...data,
            publishedAt: data.status === "PUBLISHED" && !existing.publishedAt ? new Date() : existing.publishedAt,
            tags: tags ? { deleteMany: {}, create: tags.map((tagId) => ({ tagId })) } : undefined,
        },
        include: { author: { select: { id: true, name: true } }, category: true, tags: { include: { tag: true } } },
    });

    logger.info("Artigo atualizado", { articleId: id, userId: req.user.id });
    return ApiResponse.success(res, article, "Artigo atualizado com sucesso");
});

export const deleteArticle = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) return ApiResponse.error(res, "Artigo não encontrado", 404);

    await prisma.article.delete({ where: { id } });
    logger.info("Artigo removido", { articleId: id, userId: req.user.id });
    return ApiResponse.success(res, null, "Artigo removido com sucesso");
});
