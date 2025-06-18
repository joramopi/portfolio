const express = require('express');
const multer = require('multer');
const path = require('path');

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

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  const url = `${req.protocol}://${req.get('host')}${filePath}`;
  res.json({ url });
});

module.exports = router;
