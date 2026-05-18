import { Router } from "express";
import { listSocialPosts, createSocialPost, updateSocialPost, deleteSocialPost } from "./social-post.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware, authorizeRoles("ADMIN", "EDITOR"));

router.get("/", listSocialPosts);
router.post("/", createSocialPost);
router.put("/:id", updateSocialPost);
router.delete("/:id", deleteSocialPost);

export default router;
