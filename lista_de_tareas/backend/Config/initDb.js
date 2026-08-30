import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const inicializarBaseDeDatos = async () => {
  try {
    // 1. Conexión inicial sin especificar la base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      multipleStatements: true // Permite ejecutar todo el script SQL de una sola vez
    });

    // 2. Leer el archivo SQL
    const sqlPath = path.join(__dirname, "lista_de_tareas_db.sql");
    const sqlScript = fs.readFileSync(sqlPath, "utf-8");

    // 3. Ejecutar las sentencias SQL
    await connection.query(sqlScript);
    console.log("🟢 Base de datos e instalaciones iniciales creadas/verificadas automáticamente.");
    await connection.end();
  } catch (error) {
    console.error("🔴 Error al inicializar la base de datos automáticamente:", error.message);
  }
};