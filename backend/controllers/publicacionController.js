const Publicacion = require('../models/Publicacion');

const list = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll();
    res.json(publicaciones);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener publicaciones' });
  }
};

const create = async (req, res) => {
  try {
    const nueva = await Publicacion.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear publicaci\u00f3n' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await Publicacion.update(req.body, { where: { id } });
    if (rows === 0) {
      return res.status(404).json({ message: 'Publicaci\u00f3n no encontrada' });
    }
    const actualizada = await Publicacion.findByPk(id);
    res.json(actualizada);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar publicaci\u00f3n' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await Publicacion.destroy({ where: { id } });
    if (rows === 0) {
      return res.status(404).json({ message: 'Publicaci\u00f3n no encontrada' });
    }
    res.json({ message: 'Publicaci\u00f3n eliminada' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar publicaci\u00f3n' });
  }
};

module.exports = { create, update, remove, list };
