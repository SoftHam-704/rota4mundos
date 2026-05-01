import { Router } from "express";
import { listUsers, updateUser, updateProfile } from "./user.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, authorizeRoles("ADMIN"), listUsers);
router.put("/profile", authMiddleware, updateProfile);
router.put("/:id", authMiddleware, authorizeRoles("ADMIN"), updateUser);

export default router;
