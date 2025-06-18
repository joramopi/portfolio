// backend/controllers/publicacionesController.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Modelo
const Publicacion = sequelize.define('Publicacion', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  año: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  revista: {
    type: DataTypes.STRING,
    allowNull: false
  },
  doi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  portada: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Sincronizar modelo
Publicacion.sync();

// Controladores CRUD
const getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll();
    res.json(publicaciones);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener publicaciones' });
  }
};

const crearPublicacion = async (req, res) => {
  try {
    const nueva = await Publicacion.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear publicación' });
  }
};

const actualizarPublicacion = async (req, res) => {
  try {
    const id = req.params.id;
    const actualizada = await Publicacion.update(req.body, { where: { id } });
    res.json({ message: 'Publicación actualizada' });
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar publicación' });
  }
};

const eliminarPublicacion = async (req, res) => {
  try {
    const id = req.params.id;
    await Publicacion.destroy({ where: { id } });
    res.json({ message: 'Publicación eliminada' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar publicación' });
  }
};

module.exports = {
  getPublicaciones,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion
};
