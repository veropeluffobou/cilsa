import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

import { inicializarBaseDeDatos } from "./Config/initDb.js"; // <-- Importar inicializador
//import "./Config/db.js";
import usuarioRoutes from "./Routes/usuario.routes.js";
import categoriaRoutes from "./Routes/categoria.routes.js";
import tareaRoutes from "./Routes/tarea.routes.js";
import inicioRoutes from "./Routes/inicio.routes.js";

dotenv.config();

// 🚀 Inicializar la Base de Datos automáticamente antes de arrancar la API
await inicializarBaseDeDatos();

const server = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares para procesar datos
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Apuntar a las carpetas 'Public' y 'Views' dentro de 'frontend'
const frontendPath = path.join(__dirname, "../frontend");
server.use(express.static(path.join(frontendPath, "Public")));

server.use(
  session({
    secret: process.env.SESSION_SECRET || "clave_secreta_lista_de_tareas",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 Horas
  })
);

server.set("view engine", "ejs");
server.set("views", path.join(frontendPath, "Views"));

// Enrutamiento General
server.use("/", inicioRoutes);
server.use("/usuarios", usuarioRoutes);
server.use("/categorias", categoriaRoutes);
server.use("/tareas", tareaRoutes);

server.listen(PORT, () => {
  console.log(`Servidor de lista_de_tareas iniciado en: http://localhost:${PORT}`);
});