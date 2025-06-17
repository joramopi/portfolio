const express = require('express');
const { getMe } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', verifyToken, getMe);

// Ejemplo ruta para admin:
router.post('/admin/crear-usuario', verifyToken, isAdmin, (req, res) => {
  // lógica aquí
});

module.exports = router;
