const express = require('express');
const router = express.Router();

const medicationController = require('../controllers/MedicationController');

router.post('/:emergencyProfileId', medicationController.createMedication);
router.put('/:emergencyProfileId/:id', medicationController.updateMedication)

module.exports = router;