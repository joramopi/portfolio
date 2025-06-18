const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Publicacion = require('../models/Publicacion');

// Obtener todas las publicaciones
const getPublicaciones = async (req, res) => {
  try {
    const { page = 1, limit = 50, search } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { titulo: { [Op.like]: `%${search}%` } },
          { revista: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const { count, rows } = await Publicacion.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['año', 'DESC'], ['createdAt', 'DESC']]
    });

    res.json({
      publicaciones: rows,
      totalCount: count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit)
    });
  } catch (err) {
    console.error('Error al obtener publicaciones:', err);
    res.status(500).json({ message: 'Error al obtener publicaciones' });
  }
};

// Crear nueva publicación
const crearPublicacion = async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Datos inválidos',
        errors: errors.array()
      });
    }

    const { titulo, año, revista, doi, portada } = req.body;

    // Verificar si ya existe una publicación con el mismo DOI
    const existingPub = await Publicacion.findOne({ where: { doi } });
    if (existingPub) {
      return res.status(400).json({
        message: 'Ya existe una publicación con este DOI'
      });
    }

    const nueva = await Publicacion.create({
      titulo: titulo.trim(),
      año: parseInt(año),
      revista: revista.trim(),
      doi: doi.trim(),
      portada: portada ? portada.trim() : null
    });

    res.status(201).json({
      message: 'Publicación creada exitosamente',
      publicacion: nueva
    });
  } catch (err) {
    console.error('Error al crear publicación:', err);
    res.status(500).json({ message: 'Error al crear publicación' });
  }
};

// Actualizar publicación
const actualizarPublicacion = async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Datos inválidos',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { titulo, año, revista, doi, portada } = req.body;

    // Verificar que la publicación existe
    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    // Verificar DOI duplicado (excluyendo la publicación actual)
    if (doi !== publicacion.doi) {
      const existingPub = await Publicacion.findOne({
        where: {
          doi,
          id: { [Op.ne]: id }
        }
      });
      if (existingPub) {
        return res.status(400).json({
          message: 'Ya existe otra publicación con este DOI'
        });
      }
    }

    // Actualizar
    await publicacion.update({
      titulo: titulo.trim(),
      año: parseInt(año),
      revista: revista.trim(),
      doi: doi.trim(),
      portada: portada ? portada.trim() : null
    });

    res.json({
      message: 'Publicación actualizada exitosamente',
      publicacion
    });
  } catch (err) {
    console.error('Error al actualizar publicación:', err);
    res.status(500).json({ message: 'Error al actualizar publicación' });
  }
};

// Eliminar publicación
const eliminarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;

    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    await publicacion.destroy();

    res.json({ message: 'Publicación eliminada exitosamente' });
  } catch (err) {
    console.error('Error al eliminar publicación:', err);
    res.status(500).json({ message: 'Error al eliminar publicación' });
  }
};

module.exports = {
  getPublicaciones,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion
};
