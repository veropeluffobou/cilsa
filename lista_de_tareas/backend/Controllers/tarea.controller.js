import { obtenerMisTareas, crearTarea, editarTarea, eliminarTarea } from "../Models/tarea.model.js";
import { obtenerCategorias } from "../Models/categoria.model.js";
import { crearDetalleTarea, editarDetalleTarea, eliminarDetalleTarea, cambiarEstadoTarea } from "../Models/detalle_tarea.model.js";

export const mostrarTareas = async (req, res) => {
  try {
    const id_usuario = req.session.usuario.id_usuario;
    const filtros = {
      buscar: req.query.buscar || "",
      categoria: req.query.categoria || "",
      prioridad: req.query.prioridad || "",
      estado: req.query.estado || ""
    };

    const tareas = await obtenerMisTareas(id_usuario, filtros);
    const categorias = await obtenerCategorias(id_usuario);
    const success = req.session.success;
    delete req.session.success;

    res.render("tareas/index", {
      tareas,
      categorias,
      usuario: req.session.usuario,
      filtros,
      success
    });
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).send("Error del servidor al cargar el panel de tareas.");
  }
};

export const crear = async (req, res) => {
  try {
    const { nombre, descripcion, id_categoria, prioridad, fecha_inicio, fecha_vencimiento } = req.body;
    const id_creador = req.session.usuario.id_usuario;

    const resultado = await crearTarea({ nombre, descripcion, id_categoria, id_creador });
    const id_tarea = resultado.insertId;

    await crearDetalleTarea({
      id_usuario: id_creador,
      id_tarea,
      id_estado: 1,
      prioridad,
      fecha_inicio,
      fecha_vencimiento
    });

    req.session.success = "Tarea registrada exitosamente.";
    res.redirect("/tareas");
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).send("Error interno al registrar la tarea.");
  }
};

export const editar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, id_categoria, prioridad, fecha_inicio, fecha_vencimiento } = req.body;

    // Actualizar tabla principal 'tareas'
    await editarTarea(id, { nombre, descripcion, id_categoria });

    // Actualizar tabla relacional 'detalle_tarea'
    await editarDetalleTarea(id, { prioridad, fecha_inicio, fecha_vencimiento });

    req.session.success = "Tarea actualizada correctamente.";
    res.redirect("/tareas");
  } catch (error) {
    console.error("Error al editar tarea:", error);
    res.status(500).send("Error interno al actualizar la tarea.");
  }
};

export const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_estado } = req.body;
    await cambiarEstadoTarea(id, id_estado);
    res.redirect("/tareas");
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).send("Error interno al cambiar el estado.");
  }
};

export const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarDetalleTarea(id);
    await eliminarTarea(id);
    req.session.success = "Tarea eliminada correctamente.";
    res.redirect("/tareas");
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).send("Error interno al eliminar la tarea.");
  }
};
