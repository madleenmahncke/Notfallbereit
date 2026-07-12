const express = require('express');
const router = express.Router();

const emergencyContactController = require('../controllers/EmergencyContactController');
const verifyToken = require("../middleware/VerifyToken");
const requireRole = require("../middleware/RequireRole");

router.post('/:emergencyProfileId', verifyToken, requireRole("PATIENT"), emergencyContactController.createEmergencyContact);
router.put('/:emergencyProfileId/:id', verifyToken, requireRole("PATIENT"), emergencyContactController.updateEmergencyContact);
router.delete('/:emergencyProfileId/:id', verifyToken, requireRole("PATIENT"), emergencyContactController.deleteEmergencyContact);

module.exports = router;