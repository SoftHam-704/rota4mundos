import { Router } from "express";
import { timingSafeEqual } from "crypto";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { saudeDosAgentes } from "./saude.service.js";

const router = Router();

// Token próprio, só leitura, só para o Guardião. Sem token configurado, a rota fica fechada.
function autorizado(req) {
    const esperado = process.env.SAUDE_AGENTES_TOKEN || "";
    const recebido = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    if (!esperado || recebido.length !== esperado.length) return false;
    return timingSafeEqual(Buffer.from(recebido), Buffer.from(esperado));
}

// GET /api/saude/agentes — estado dos agentes agendados (sem dado de leitor nem texto de post)
router.get("/agentes", asyncHandler(async (req, res) => {
    if (!autorizado(req)) return res.status(401).json({ erro: "não autorizado" });
    res.set("Cache-Control", "no-store");
    return res.json(await saudeDosAgentes());
}));

export default router;
