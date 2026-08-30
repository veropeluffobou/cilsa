import { obtenerCategorias, crearCategoria, editarCategoria, eliminarCategoria } from "../Models/categoria.model.js";

export const listar = async (req, res) => {
  try {
    const id_usuario = req.session.usuario.id_usuario;
    const categorias = await obtenerCategorias(id_usuario);
    const success = req.session.success;
    delete req.session.success;
    res.render("categorias/index", { categorias, success });
  } catch (error) {
    res.status(500).send("Error al obtener categorías.");
  }
};

export const crear = async (req, res) => {
  try {
    const { nombre, color } = req.body;
    const id_usuario = req.session.usuario.id_usuario;
    await crearCategoria({ nombre, color, id_usuario });
    req.session.success = "Categoría creada correctamente.";
    res.redirect("/categorias");
  } catch (error) {
    res.status(500).send("Error al crear categoría.");
  }
};

export const editar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, color } = req.body;
    await editarCategoria(id, nombre, color);
    res.redirect("/categorias");
  } catch (error) {
    res.status(500).send("Error al editar categoría.");
  }
};

export const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarCategoria(id);
    req.session.success = "Categoría eliminada correctamente.";
    res.redirect("/categorias");
  } catch (error) {
    res.status(500).send("Error al eliminar categoría.");
  }
};