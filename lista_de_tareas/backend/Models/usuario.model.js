import db from "../Config/db.js";

export const crearUsuario = async ({ nombre, apellido, email, password }) => {
  const sql = `INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)`;
  const [resultado] = await db.execute(sql, [nombre, apellido, email, password]);
  return resultado;
};

export const buscarPorEmail = async (email) => {
  const sql = `SELECT * FROM usuarios WHERE email = ?`;
  const [rows] = await db.execute(sql, [email]);
  return rows[0];
};