import { crearUsuario, buscarPorEmail } from "../Models/usuario.model.js";
import bcrypt from "bcrypt";

export const registrar = async (req, res) => {
  try {
    const { nombre, apellido, email, password, confirmPassword } = req.body;
    const existe = await buscarPorEmail(email);
    if (existe) return res.render("login/registro", { mensaje: "El correo ya existe.", success: null });
    if (password !== confirmPassword) return res.render("login/registro", { mensaje: "Las contraseñas no coinciden.", success: null });

    const passwordEncriptada = await bcrypt.hash(password, 10);
    await crearUsuario({ nombre, apellido, email, password: passwordEncriptada });
    req.session.success = "Usuario registrado correctamente.";
    res.redirect("/usuarios/login");
  } catch (error) {
    console.error("🔴 ERROR EN REGISTRO:", error); // <-- Muestra el error exacto en la terminal
    res.status(500).send("Error del servidor en el registro.");
  }
}; 

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await buscarPorEmail(email);
    if (!usuario) return res.render("login/login", { mensaje: "Usuario no encontrado.", success: null });

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) return res.render("login/login", { mensaje: "Contraseña incorrecta.", success: null });

    req.session.usuario = { id_usuario: usuario.id_usuario, nombre: usuario.nombre, email: usuario.email };
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error del servidor en el inicio de sesión.");
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => res.redirect("/usuarios/login"));
};