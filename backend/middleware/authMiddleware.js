// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// Verifica que el token esté presente y válido
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// Verifica si el usuario es administrador
const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Acceso solo para administradores' });
  }
  next();
};

// Verifica si el usuario es editor
const isEditor = (req, res, next) => {
  if (req.userRole !== 'editor') {
    return res.status(403).json({ message: 'Acceso solo para editores' });
  }
  next();
};

// Verifica si el usuario es admin o editor
const isAdminOrEditor = (req, res, next) => {
  if (req.userRole === 'admin' || req.userRole === 'editor') {
    next();
  } else {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isEditor,
  isAdminOrEditor
};
