import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";
import { validateSchema } from "../../middlewares/validationMiddleware.js";
import {
    createInterest,
    listInterests,
    getStats,
    updateStatus,
} from "./sponsor.controller.js";
import {
    createSponsorInterestSchema,
    updateSponsorStatusSchema,
} from "./sponsor.schema.js";

const router = Router();

// Público — qualquer um pode manifestar interesse
router.post("/interesse", validateSchema(createSponsorInterestSchema), createInterest);

// Admin — gerenciamento
router.get(  "/",          authMiddleware, authorizeRoles("ADMIN", "EDITOR"), listInterests);
router.get(  "/stats",     authMiddleware, authorizeRoles("ADMIN", "EDITOR"), getStats);
router.patch("/:id/status", authMiddleware, authorizeRoles("ADMIN"),          validateSchema(updateSponsorStatusSchema), updateStatus);

export default router;
