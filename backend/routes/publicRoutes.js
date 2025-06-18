const express = require('express');
const { getPublicaciones } = require('../controllers/publicacionesController');

const router = express.Router();

router.get('/publicaciones', getPublicaciones);

module.exports = router;
