module.exports = (err, req, res, next) => {
  console.error(err);
  if (!res.headersSent) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
