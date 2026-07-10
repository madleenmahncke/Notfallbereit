const express = require('express');
const router = express.Router();

const emergencyProfileController = require('../controllers/EmergencyProfileController');
const verifyToken = require("../middleware/verifyToken");
const requireRole = require("../middleware/requireRole");

router.post('/:patientId', verifyToken, requireRole("PATIENT"), emergencyProfileController.createEmergencyProfile);
router.put('/:patientId/:id', verifyToken, requireRole("PATIENT"), emergencyProfileController.updateEmergencyProfile);
router.get('/:patientId/:id', verifyToken, requireRole("PATIENT", "PARAMEDIC"), emergencyProfileController.getEmergencyProfile)

module.exports = router;