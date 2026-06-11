const express = require('express');
const router = express.Router();

const emergencyContactController = require('../controllers/EmergencyContactController');

router.post('/:emergencyProfileId', emergencyContactController.createEmergencyContact);
router.put('/:emergencyProfileId/:id', emergencyContactController.updateEmergencyContact);

module.exports = router;