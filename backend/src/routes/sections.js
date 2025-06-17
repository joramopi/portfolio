const express = require('express');
const router = express.Router();

// Placeholder route for fetching sections
router.get('/', (req, res) => {
  // In a real app, fetch from database
  res.json([
    { id: 1, name: 'Inicio' },
    { id: 2, name: 'Sobre mí' }
  ]);
});

module.exports = router;
