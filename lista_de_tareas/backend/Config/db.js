import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "lista_de_tareas_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

try {
  await connection.getConnection();
  console.log("Conexión con la base de datos MySQL establecida exitosamente.");
} catch (error) {
  console.error("Error al conectar con la base de datos MySQL:", error.message);
}

export default connection;