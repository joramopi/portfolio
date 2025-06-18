// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Acceso solo para administradores' });
  }
  next();
};

const isEditor = (req, res, next) => {
  if (req.userRole !== 'editor') {
    return res.status(403).json({ message: 'Acceso solo para editores' });
  }
  next();
};

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
