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
const getPublicaciones = async (req, res, next) => {
  try {
    const publicaciones = await Publicacion.findAll();
    res.json(publicaciones);
  } catch (err) {
    next(err);
  }
};

const crearPublicacion = async (req, res, next) => {
  try {
    const nueva = await Publicacion.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    next(err);
  }
};

const actualizarPublicacion = async (req, res, next) => {
  try {
    const id = req.params.id;
    const actualizada = await Publicacion.update(req.body, { where: { id } });
    res.json({ message: 'Publicación actualizada' });
  } catch (err) {
    next(err);
  }
};

const eliminarPublicacion = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Publicacion.destroy({ where: { id } });
    res.json({ message: 'Publicación eliminada' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPublicaciones,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion
};
