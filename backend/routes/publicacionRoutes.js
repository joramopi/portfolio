const express = require('express');
const { verifyToken, isAdminOrEditor } = require('../middleware/authMiddleware');
const { create, update, remove, list } = require('../controllers/publicacionController');

const router = express.Router();

router.get('/', verifyToken, isAdminOrEditor, list);
router.post('/', verifyToken, isAdminOrEditor, create);
router.put('/:id', verifyToken, isAdminOrEditor, update);
router.delete('/:id', verifyToken, isAdminOrEditor, remove);

module.exports = router;
