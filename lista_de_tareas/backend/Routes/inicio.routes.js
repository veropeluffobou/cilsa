import express from "express";
import { mostrarInicio } from "../Controllers/inicio.controller.js";
import { authMiddleware } from "../Middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, mostrarInicio);

export default router;