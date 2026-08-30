import db from "../Config/db.js";

export const crearDetalleTarea = async (detalle) => {
  const { id_usuario, id_tarea, id_estado, prioridad, fecha_inicio, fecha_vencimiento } = detalle;
  const sql = `
    INSERT INTO detalle_tarea (id_usuario, id_tarea, id_estado, prioridad, fecha_inicio, fecha_vencimiento)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [resultado] = await db.execute(sql, [
    id_usuario,
    id_tarea,
    id_estado,
    prioridad || "Media",
    fecha_inicio || null,
    fecha_vencimiento || null
  ]);
  return resultado;
};

export const editarDetalleTarea = async (id_tarea, detalle) => {
  const { prioridad, fecha_inicio, fecha_vencimiento } = detalle;
  const sql = `
    UPDATE detalle_tarea 
    SET prioridad = ?, fecha_inicio = ?, fecha_vencimiento = ? 
    WHERE id_tarea = ?
  `;
  const [resultado] = await db.execute(sql, [
    prioridad,
    fecha_inicio || null,
    fecha_vencimiento || null,
    id_tarea
  ]);
  return resultado;
};

export const cambiarEstadoTarea = async (id_tarea, id_estado) => {
  const fecha_finalizacion = id_estado == 3 ? new Date() : null;
  const sql = `
    UPDATE detalle_tarea
    SET id_estado = ?, fecha_finalizacion = ?
    WHERE id_tarea = ?
  `;
  const [resultado] = await db.execute(sql, [id_estado, fecha_finalizacion, id_tarea]);
  return resultado;
};

export const eliminarDetalleTarea = async (id_tarea) => {
  const sql = `DELETE FROM detalle_tarea WHERE id_tarea = ?`;
  const [resultado] = await db.execute(sql, [id_tarea]);
  return resultado;
};
