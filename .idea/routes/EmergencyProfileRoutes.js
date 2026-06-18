const express = require('express');
const router = express.Router();

const emergencyProfileController = require('../controllers/EmergencyProfileController');

router.post('/:patientId', emergencyProfileController.createEmergencyProfile);
router.put('/:patientId/:id', emergencyProfileController.updateEmergencyProfile);
router.get('/:patientId/:id', emergencyProfileController.getEmergencyProfile)

module.exports = router;