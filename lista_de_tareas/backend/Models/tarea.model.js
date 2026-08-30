import db from "../Config/db.js";

export const obtenerTareaPorId = async (id_tarea) => {
  const sql = `SELECT * FROM tareas WHERE id_tarea = ?`;
  const [rows] = await db.execute(sql, [id_tarea]);
  return rows[0];
};

export const obtenerMisTareas = async (id_usuario, filtros = {}) => {
  let sql = `
    SELECT 
      t.id_tarea,
      t.nombre,
      t.descripcion,
      t.fecha_creacion,
      t.id_categoria,
      t.id_creador,
      c.nombre AS categoria,
      c.color AS color_categoria,
      u.nombre AS nombre_creador,
      u.apellido AS apellido_creador,
      dt.id_estado,
      e.nombre AS estado,
      dt.prioridad,
      dt.fecha_inicio,
      dt.fecha_vencimiento,
      dt.fecha_finalizacion
    FROM tareas t
    INNER JOIN categorias c ON t.id_categoria = c.id_categoria
    INNER JOIN usuarios u ON t.id_creador = u.id_usuario
    INNER JOIN detalle_tarea dt ON t.id_tarea = dt.id_tarea
    INNER JOIN estados e ON dt.id_estado = e.id_estado
    WHERE dt.id_usuario = ?
  `;
  let valores = [id_usuario];

  if (filtros.buscar) {
    sql += ` AND (t.nombre LIKE ? OR t.descripcion LIKE ?)`;
    valores.push(`%${filtros.buscar}%`, `%${filtros.buscar}%`);
  }
  if (filtros.categoria) {
    sql += ` AND t.id_categoria = ?`;
    valores.push(filtros.categoria);
  }
  if (filtros.prioridad) {
    sql += ` AND dt.prioridad = ?`;
    valores.push(filtros.prioridad);
  }
  if (filtros.estado) {
    sql += ` AND dt.id_estado = ?`;
    valores.push(filtros.estado);
  }

  sql += ` ORDER BY t.fecha_creacion DESC`;
  const [rows] = await db.execute(sql, valores);
  return rows;
};

export const crearTarea = async (tarea) => {
  const { nombre, descripcion, id_categoria, id_creador } = tarea;
  const sql = `INSERT INTO tareas (nombre, descripcion, id_categoria, id_creador) VALUES (?, ?, ?, ?)`;
  const [resultado] = await db.execute(sql, [nombre, descripcion, id_categoria, id_creador]);
  return resultado;
};

export const editarTarea = async (id_tarea, tarea) => {
  const { nombre, descripcion, id_categoria } = tarea;
  const sql = `UPDATE tareas SET nombre = ?, descripcion = ?, id_categoria = ? WHERE id_tarea = ?`;
  const [resultado] = await db.execute(sql, [nombre, descripcion, id_categoria, id_tarea]);
  return resultado;
};

export const eliminarTarea = async (id_tarea) => {
  const sql = `DELETE FROM tareas WHERE id_tarea = ?`;
  const [resultado] = await db.execute(sql, [id_tarea]);
  return resultado;
};
