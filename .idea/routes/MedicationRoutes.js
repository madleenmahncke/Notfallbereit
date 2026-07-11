const express = require('express');
const router = express.Router();

const medicationController = require('../controllers/MedicationController');
const verifyToken = require("../middleware/verifyToken");
const requireRole = require("../middleware/requireRole");

router.post('/:emergencyProfileId', verifyToken, requireRole("PATIENT"), medicationController.createMedication);
router.put('/:emergencyProfileId/:id', verifyToken, requireRole("PATIENT"), medicationController.updateMedication)
router.delete('/:emergencyProfileId/:id', verifyToken, requireRole("PATIENT"), medicationController.deleteMedication)

module.exports = router;