import { Router } from "express";
import {
    listSocialPosts, statusInstagram, gerarAgora, aprovar, rejeitar, editarLegenda, publicarAgora, deleteSocialPost,
    conectarFacebook, retornoFacebook,
} from "./social-post.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = Router();

// Retorno do diálogo do Facebook: chega SEM login (é o navegador vindo do Facebook). Quem prova que
// o pedido saiu do admin é o `state` de uso único gravado em conectarFacebook.
router.get("/facebook/retorno", retornoFacebook);

router.use(authMiddleware, authorizeRoles("ADMIN", "EDITOR"));

router.get("/", listSocialPosts);
router.get("/status", statusInstagram);
router.post("/gerar", gerarAgora);
router.post("/facebook/conectar", authorizeRoles("ADMIN"), conectarFacebook);
router.post("/:id/aprovar", aprovar);
router.post("/:id/rejeitar", rejeitar);
router.put("/:id", editarLegenda);
router.post("/:id/publicar-agora", authorizeRoles("ADMIN"), publicarAgora);
router.delete("/:id", deleteSocialPost);

export default router;
