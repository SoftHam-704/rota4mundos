import { Router } from "express";
import {
    createCity,
    listCities,
    getCityBySlug,
    updateCity,
    deleteCity,
} from "./city.controller.js";
import { authMiddleware, authorizeRoles } from "../../middlewares/authMiddleware.js";
import { validateSchema } from "../../middlewares/validationMiddleware.js";
import { createCitySchema, updateCitySchema, cityQuerySchema } from "./city.schema.js";

const router = Router();

// Rotas públicas
router.get("/", validateSchema(cityQuerySchema, "query"), listCities);
router.get("/:slug", getCityBySlug);

// Rotas protegidas (Admin e Editor)
router.post("/", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), validateSchema(createCitySchema), createCity);
router.put("/:id", authMiddleware, authorizeRoles("ADMIN", "EDITOR"), validateSchema(updateCitySchema), updateCity);

// Rotas exclusivas de Admin
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteCity);

export default router;
