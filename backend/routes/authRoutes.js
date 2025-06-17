const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getMe);

// Ejemplo ruta para admin:
router.post('/admin/crear-usuario', verifyToken, isAdmin, (req, res) => {
  // lógica aquí
});

module.exports = router;
