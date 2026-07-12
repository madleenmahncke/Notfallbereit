const express = require('express');
const router = express.Router();

const emergencyProfileController = require('../controllers/EmergencyProfileController');
const verifyToken = require("../middleware/verifyToken");
const requireRole = require("../middleware/requireRole");

router.post('/createEmergencyProfile', verifyToken, requireRole("PATIENT"), emergencyProfileController.createEmergencyProfile);
router.put('/updateEmergencyProfile/:id', verifyToken, requireRole("PATIENT"), emergencyProfileController.updateEmergencyProfile);
router.get('/qrCode/:uuid', verifyToken, requireRole("PARAMEDIC"), emergencyProfileController.getEmergencyProfileWithUuid);
router.get('/getEmergencyProfile/:id', verifyToken, requireRole("PATIENT"), emergencyProfileController.getEmergencyProfile);

module.exports = router;