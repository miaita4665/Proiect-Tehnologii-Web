const express = require('express');
const router = express.Router();
const paperController = require('../controllers/paperController');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary'); // Import configurarea Cloudinary

// Adaugam middleware-ul upload.single('file') inainte de controller
router.post('/upload', authenticateToken, upload.single('file'), paperController.uploadPaper);

module.exports = router;