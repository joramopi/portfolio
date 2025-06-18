// backend/routes/publicacionesRoutes.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { verifyToken, isAdminOrEditor } = require('../middleware/authMiddleware');
const { getPublicaciones, crearPublicacion, actualizarPublicacion, eliminarPublicacion } = require('../controllers/publicacionesController');

const validatePublicacion = [
  body('titulo').notEmpty().trim().escape(),
  body('año').isInt({ min: 1900, max: new Date().getFullYear() + 1 }),
  body('revista').notEmpty().trim().escape(),
  body('doi').notEmpty().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Rutas protegidas para CRUD de publicaciones
router.get('/publicaciones', verifyToken, isAdminOrEditor, getPublicaciones);
router.post('/publicaciones', verifyToken, isAdminOrEditor, validatePublicacion, crearPublicacion);
router.put('/publicaciones/:id', verifyToken, isAdminOrEditor, validatePublicacion, actualizarPublicacion);
router.delete('/publicaciones/:id', verifyToken, isAdminOrEditor, eliminarPublicacion);

module.exports = router;
