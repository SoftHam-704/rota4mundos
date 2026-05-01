import { Router } from "express";
import { createComment, listComments, moderateComment, deleteComment } from "./comment.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/", createComment);
router.get("/", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), listComments);
router.patch("/:id/moderate", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), moderateComment);
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteComment);

export default router;
