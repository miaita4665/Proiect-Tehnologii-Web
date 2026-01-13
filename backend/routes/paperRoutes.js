const express = require('express');
const router = express.Router();
const paperController = require('../controllers/paperController');
const authenticateToken = require('../middleware/authMiddleware'); // Import middleware

// Adaug authenticateToken inainte de funcția din controller
router.post('/upload', authenticateToken, paperController.uploadPaper);

module.exports = router;