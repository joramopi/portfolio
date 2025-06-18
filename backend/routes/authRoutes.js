const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para registrar usuarios
router.post('/register', register);

// Información del usuario autenticado
router.get('/me', verifyToken, getMe);

module.exports = router;
