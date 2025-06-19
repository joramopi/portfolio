const express = require('express');
const multer = require('multer');
const path = require('path');

const { verifyToken, isAdminOrEditor } = require('../middleware/authMiddleware');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, unique);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (allowed.test(ext) && allowed.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de archivo no permitido'));
    }
  }
});

router.post('/upload', verifyToken, isAdminOrEditor, upload.single('image'), (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  const url = `${req.protocol}://${req.get('host')}${filePath}`;
  res.json({ url });
});

module.exports = router;
