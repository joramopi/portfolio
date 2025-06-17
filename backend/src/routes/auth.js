const express = require('express');
const router = express.Router();

// Placeholder login route
router.post('/login', (req, res) => {
  // Here you would normally validate credentials and issue a token
  res.json({ token: 'fake-token' });
});

module.exports = router;
