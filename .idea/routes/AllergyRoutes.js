const express = require('express');
const router = express.Router();

const allergyController = require('../controllers/AllergyController');

router.post('/:emergencyProfileId', allergyController.createAllergy);
router.put('/:emergencyProfileId/:id', allergyController.updateAllergy);
router.delete('/:emergencyProfileId/:id', allergyController.deleteAllergy);

module.exports = router;