const express = require('express');
const router = express.Router();
const paperController = require('../controllers/paperController');

// Ruta: POST /api/papers/upload
router.post('/upload', paperController.uploadPaper);

module.exports = router;