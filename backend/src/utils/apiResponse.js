/**
 * Padroniza as respostas da API para consistência em todo o projeto
 */

export class ApiResponse {
    /**
     * Resposta de sucesso
     * @param {Response} res - Objeto Response do Express
     * @param {any} data - Dados a serem retornados
     * @param {string} message - Mensagem opcional
     * @param {number} statusCode - Código HTTP (default: 200)
     */
    static success(res, data = null, message = "Operação realizada com sucesso", statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString(),
        });
    }

    /**
     * Resposta de erro
     * @param {Response} res - Objeto Response do Express
     * @param {string} message - Mensagem de erro
     * @param {number} statusCode - Código HTTP (default: 400)
     * @param {any} errors - Detalhes adicionais do erro
     */
    static error(res, message = "Erro na operação", statusCode = 400, errors = null) {
        const response = {
            success: false,
            message,
            timestamp: new Date().toISOString(),
        };

        if (errors) {
            response.errors = errors;
        }

        return res.status(statusCode).json(response);
    }

    /**
     * Resposta paginada
     * @param {Response} res - Objeto Response do Express
     * @param {Array} data - Array de itens
     * @param {Object} pagination - Metadados de paginação
     */
    static paginated(res, data, pagination) {
        return res.status(200).json({
            success: true,
            data,
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                totalItems: pagination.totalItems,
                totalPages: Math.ceil(pagination.totalItems / pagination.limit),
                hasNextPage: pagination.page * pagination.limit < pagination.totalItems,
                hasPrevPage: pagination.page > 1,
            },
            timestamp: new Date().toISOString(),
        });
    }
}
