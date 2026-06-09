const express = require('express');
const router = express.Router();

const emergencyProfileController = require('../controllers/EmergencyProfileController');

router.post('/:patientId', emergencyProfileController.createEmergencyProfile);

module.exports = router;