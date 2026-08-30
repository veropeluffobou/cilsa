import express from "express";
import { mostrarTareas, crear, editar,cambiarEstado, eliminar } from "../Controllers/tarea.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, mostrarTareas);
router.post("/", authMiddleware, crear);
router.post("/editar/:id", authMiddleware, editar);
router.post("/estado/:id", authMiddleware, cambiarEstado);
router.post("/eliminar/:id", authMiddleware, eliminar);

export default router;