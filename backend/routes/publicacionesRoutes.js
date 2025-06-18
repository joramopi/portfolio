// backend/routes/publicacionesRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, isAdminOrEditor } = require('../middleware/authMiddleware');
const { getPublicaciones, crearPublicacion, actualizarPublicacion, eliminarPublicacion } = require('../controllers/publicacionesController');
const validate = require('../middleware/validate');
const { body, param } = require('express-validator');

// Rutas protegidas para CRUD de publicaciones
router.get('/publicaciones', verifyToken, isAdminOrEditor, getPublicaciones);
router.post(
  '/publicaciones',
  verifyToken,
  isAdminOrEditor,
  [
    body('titulo').notEmpty().withMessage('El título es obligatorio'),
    body('año').isInt().withMessage('El año debe ser numérico'),
    body('revista').notEmpty().withMessage('La revista es obligatoria'),
    body('doi').notEmpty().withMessage('El DOI es obligatorio'),
    body('portada').optional().isURL().withMessage('La portada debe ser una URL')
  ],
  validate,
  crearPublicacion
);

router.put(
  '/publicaciones/:id',
  verifyToken,
  isAdminOrEditor,
  [
    param('id').isInt().withMessage('ID inválido'),
    body('titulo').optional().notEmpty(),
    body('año').optional().isInt(),
    body('revista').optional().notEmpty(),
    body('doi').optional().notEmpty(),
    body('portada').optional().isURL()
  ],
  validate,
  actualizarPublicacion
);

router.delete(
  '/publicaciones/:id',
  verifyToken,
  isAdminOrEditor,
  [param('id').isInt().withMessage('ID inválido')],
  validate,
  eliminarPublicacion
);

module.exports = router;
