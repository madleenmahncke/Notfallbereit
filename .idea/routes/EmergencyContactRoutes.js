const express = require('express');
const router = express.Router();

const emergencyContactController = require('../controllers/EmergencyContactController');

router.post('/:emergencyProfileId', emergencyContactController.createEmergencyContact);
router.put('/:emergencyProfileId/:id', emergencyContactController.updateEmergencyContact);
router.delete('/:emergencyProfileId/:id', emergencyContactController.deleteEmergencyContact);

module.exports = router;