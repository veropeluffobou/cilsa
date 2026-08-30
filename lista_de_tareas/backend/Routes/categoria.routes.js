import express from "express";
import { listar, crear, editar, eliminar } from "../Controllers/categoria.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, listar);
router.post("/", authMiddleware, crear);
router.post("/editar/:id", authMiddleware, editar);
router.post("/eliminar/:id", authMiddleware, eliminar);

export default router;