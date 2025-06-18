// backend/routes/publicacionesRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, isAdminOrEditor } = require('../middleware/authMiddleware');
const { getPublicaciones, crearPublicacion, actualizarPublicacion, eliminarPublicacion } = require('../controllers/publicacionesController');

// Rutas protegidas para CRUD de publicaciones
router.get('/publicaciones', verifyToken, isAdminOrEditor, getPublicaciones);
router.post('/publicaciones', verifyToken, isAdminOrEditor, crearPublicacion);
router.put('/publicaciones/:id', verifyToken, isAdminOrEditor, actualizarPublicacion);
router.delete('/publicaciones/:id', verifyToken, isAdminOrEditor, eliminarPublicacion);

module.exports = router;
