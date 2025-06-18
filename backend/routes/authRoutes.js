const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { body } = require('express-validator');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Correo inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('role').optional().isIn(['admin', 'editor']).withMessage('Rol inválido')
  ],
  validate,
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Correo inválido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
  ],
  validate,
  login
);
router.get('/me', verifyToken, getMe);

// Ejemplo ruta para admin:
router.post('/admin/crear-usuario', verifyToken, isAdmin, (req, res) => {
  // lógica aquí
});

module.exports = router;
