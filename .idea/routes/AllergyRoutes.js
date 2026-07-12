const express = require('express');
const router = express.Router();

const allergyController = require('../controllers/AllergyController');
const verifyToken = require("../middleware/VerifyToken");
const requireRole = require("../middleware/RequireRole");

router.post('/:emergencyProfileId', verifyToken, requireRole("PATIENT"), allergyController.createAllergy);
router.put('/:emergencyProfileId/:id', verifyToken, requireRole("PATIENT"), allergyController.updateAllergy);
router.delete('/:emergencyProfileId/:id', verifyToken, requireRole("PATIENT"), allergyController.deleteAllergy);

module.exports = router;