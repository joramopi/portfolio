const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Token de acceso requerido'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'portfolio-cms',
      audience: 'portfolio-frontend'
    });

    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    } else {
      return res.status(401).json({ message: 'Error de autenticación' });
    }
  }
};

const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({
      message: 'Acceso denegado: Se requieren permisos de administrador'
    });
  }
  next();
};

const isEditor = (req, res, next) => {
  if (req.userRole !== 'editor') {
    return res.status(403).json({
      message: 'Acceso denegado: Se requieren permisos de editor'
    });
  }
  next();
};

const isAdminOrEditor = (req, res, next) => {
  if (req.userRole !== 'admin' && req.userRole !== 'editor') {
    return res.status(403).json({
      message: 'Acceso denegado: Se requieren permisos de editor o administrador'
    });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
  isEditor,
  isAdminOrEditor
};
