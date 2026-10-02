import { Router } from "express";
import {
    listSocialPosts, statusInstagram, gerarAgora, aprovar, rejeitar, editarLegenda, publicarAgora, deleteSocialPost,
} from "./social-post.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware, authorizeRoles("ADMIN", "EDITOR"));

router.get("/", listSocialPosts);
router.get("/status", statusInstagram);
router.post("/gerar", gerarAgora);
router.post("/:id/aprovar", aprovar);
router.post("/:id/rejeitar", rejeitar);
router.put("/:id", editarLegenda);
router.post("/:id/publicar-agora", authorizeRoles("ADMIN"), publicarAgora);
router.delete("/:id", deleteSocialPost);

export default router;
