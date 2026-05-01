import { prisma } from "../../config/database.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import logger from "../../config/logger.js";

/**
 * Cria uma nova cidade
 * POST /api/cities
 * Admin e Editor
 */
export const createCity = asyncHandler(async (req, res) => {
    const { name, state, country, slug, description, history, population, economy, latitude, longitude, isHighlight, order } = req.body;

    const city = await prisma.city.create({
        data: {
            name,
            state,
            country,
            slug,
            description,
            history,
            population,
            economy,
            latitude,
            longitude,
            isHighlight,
            order,
        },
        include: {
            images: true,
            statistics: true,
        },
    });

    logger.info("Cidade criada", { cityId: city.id, name: city.name, userId: req.user.id });

    return ApiResponse.success(res, city, "Cidade criada com sucesso", 201);
});

/**
 * Lista todas as cidades com paginação, filtros e ordenação
 * GET /api/cities
 * Público
 */
export const listCities = asyncHandler(async (req, res) => {
    const { page, limit, search, country, highlight, sortBy, sortOrder } = req.query;

    const skip = (page - 1) * limit;

    // Constrói o where dinamicamente
    const where = {};

    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
        ];
    }

    if (country) {
        where.country = { equals: country, mode: "insensitive" };
    }

    if (highlight === "true") {
        where.isHighlight = true;
    }

    const [cities, totalItems] = await Promise.all([
        prisma.city.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortBy]: sortOrder },
            include: {
                images: {
                    select: { id: true, url: true, altText: true, isMain: true },
                },
                statistics: true,
                _count: {
                    select: { images: true },
                },
            },
        }),
        prisma.city.count({ where }),
    ]);

    return ApiResponse.paginated(res, cities, { page, limit, totalItems });
});

/**
 * Busca uma cidade pelo slug
 * GET /api/cities/:slug
 * Público
 */
export const getCityBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const city = await prisma.city.findUnique({
        where: { slug },
        include: {
            images: {
                orderBy: { isMain: "desc" },
            },
            statistics: true,
        },
    });

    if (!city) {
        return ApiResponse.error(res, "Cidade não encontrada", 404);
    }

    return ApiResponse.success(res, city);
});

/**
 * Atualiza uma cidade
 * PUT /api/cities/:id
 * Admin e Editor
 */
export const updateCity = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const existingCity = await prisma.city.findUnique({ where: { id } });

    if (!existingCity) {
        return ApiResponse.error(res, "Cidade não encontrada", 404);
    }

    const city = await prisma.city.update({
        where: { id },
        data: req.body,
        include: {
            images: true,
            statistics: true,
        },
    });

    logger.info("Cidade atualizada", { cityId: id, userId: req.user.id });

    return ApiResponse.success(res, city, "Cidade atualizada com sucesso");
});

/**
 * Remove uma cidade
 * DELETE /api/cities/:id
 * Admin apenas
 */
export const deleteCity = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const existingCity = await prisma.city.findUnique({ where: { id } });

    if (!existingCity) {
        return ApiResponse.error(res, "Cidade não encontrada", 404);
    }

    await prisma.city.delete({ where: { id } });

    logger.info("Cidade removida", { cityId: id, userId: req.user.id });

    return ApiResponse.success(res, null, "Cidade removida com sucesso");
});
