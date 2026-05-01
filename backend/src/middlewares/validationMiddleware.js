import { ZodError } from "zod";
import { ApiResponse } from "../utils/apiResponse.js";

/**
 * Middleware factory para validação de schemas Zod
 * Valida o body, query params ou route params da requisição
 * @param {z.ZodSchema} schema - Schema Zod a ser validado
 * @param {string} source - Fonte dos dados: 'body' | 'query' | 'params'
 */
export function validateSchema(schema, source = "body") {
    return (req, res, next) => {
        try {
            const data = schema.parse(req[source]);
            // Substitui os dados originais pelos dados validados e parseados
            req[source] = data;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.errors.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                }));
                return ApiResponse.error(res, "Validação falhou", 400, formattedErrors);
            }
            next(error);
        }
    };
}
