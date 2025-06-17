const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');

async function verifyTokenMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Requires admin role' });
  }
  next();
}

function isEditor(req, res, next) {
  if (req.user.role !== 'editor') {
    return res.status(403).json({ message: 'Requires editor role' });
  }
  next();
}

function isAdminOrEditor(req, res, next) {
  if (!['admin', 'editor'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Requires admin or editor role' });
  }
  next();
}

module.exports = { verifyToken: verifyTokenMiddleware, isAdmin, isEditor, isAdminOrEditor };
