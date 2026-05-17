import { runIrisFetch } from "./ai-news.service.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import logger from "../../config/logger.js";

export const fetchAiNews = asyncHandler(async (req, res) => {
    logger.info(`IRIS: busca manual iniciada por ${req.user.email}`);

    const result = await runIrisFetch(req.user.id, {
        autoPublishThreshold: 8,
        draftThreshold: 6,
        maxItems: 10,
    });

    const message = result.published > 0 || result.drafted > 0
        ? `IRIS: ${result.published} publicado(s), ${result.drafted} rascunho(s) de ${result.total} notícias analisadas`
        : "IRIS: nenhum artigo novo (possíveis duplicatas ou baixa relevância)";

    return ApiResponse.success(res, result, message);
});
