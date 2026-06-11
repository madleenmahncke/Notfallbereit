const express = require('express');
const router = express.Router();

const medicationController = require('../controllers/MedicationController');

router.post('/:emergencyProfileId', medicationController.createMedication);
router.put('/:emergencyProfileId/:id', medicationController.updateMedication)
router.delete('/:emergencyProfileId/:id', medicationController.deleteMedication)

module.exports = router;