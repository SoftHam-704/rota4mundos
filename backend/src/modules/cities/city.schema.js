import { z } from "zod";

export const createCitySchema = z.object({
    name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").max(100),
    state: z.string().min(2).max(100),
    country: z.string().min(2).max(100),
    slug: z
        .string()
        .min(2)
        .max(100)
        .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
    description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
    history: z.string().optional(),
    population: z.number().int().positive().optional().nullable(),
    economy: z.string().optional(),
    latitude: z.number().min(-90).max(90).optional().nullable(),
    longitude: z.number().min(-180).max(180).optional().nullable(),
    isHighlight: z.boolean().default(false),
    order: z.number().int().default(0),
});

export const updateCitySchema = createCitySchema.partial();

export const cityQuerySchema = z.object({
    page: z.string().transform(Number).default("1"),
    limit: z.string().transform(Number).default("10"),
    search: z.string().optional(),
    country: z.string().optional(),
    highlight: z.enum(["true", "false"]).optional(),
    sortBy: z.enum(["name", "order", "createdAt"]).default("order"),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
});
