import db from "../Config/db.js";

export const obtenerCategorias = async (id_usuario) => {
  const sql = `SELECT * FROM categorias WHERE id_usuario = ? ORDER BY nombre`;
  const [rows] = await db.execute(sql, [id_usuario]);
  return rows;
};

export const crearCategoria = async ({ nombre, color, id_usuario }) => {
  const sql = `INSERT INTO categorias (nombre, color, id_usuario) VALUES (?, ?, ?)`;
  const [resultado] = await db.execute(sql, [nombre, color, id_usuario]);
  return resultado;
};

export const editarCategoria = async (id_categoria, nombre, color) => {
  const sql = `UPDATE categorias SET nombre = ?, color = ? WHERE id_categoria = ?`;
  const [resultado] = await db.execute(sql, [nombre, color, id_categoria]);
  return resultado;
};

export const eliminarCategoria = async (id_categoria) => {
  const sql = `DELETE FROM categorias WHERE id_categoria = ?`;
  const [resultado] = await db.execute(sql, [id_categoria]);
  return resultado;
};