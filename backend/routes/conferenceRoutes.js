const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conferenceController');

// Când cineva face POST la /api/conferences, execută funcția createConference
router.post('/', conferenceController.createConference);

// Când cineva face GET la /api/conferences, execută funcția getAllConferences
router.get('/', conferenceController.getAllConferences);

module.exports = router;