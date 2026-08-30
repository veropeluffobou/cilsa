import express from "express";
import { registrar, login, logout } from "../Controllers/usuario.controller.js";

const router = express.Router();

router.get("/registro", (req, res) => res.render("login/registro", { mensaje: null, success: null }));
router.get("/login", (req, res) => {
  const success = req.session.success;
  delete req.session.success;
  res.render("login/login", { mensaje: null, success });
});

router.post("/registro", registrar);
router.post("/login", login);
router.get("/logout", logout);

export default router;