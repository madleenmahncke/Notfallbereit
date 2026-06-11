const express = require('express');
const router = express.Router();

const allergyController = require('../controllers/AllergyController');

router.post('/:emergencyProfileId', allergyController.createAllergy);
router.put('/:emergencyProfileId/:id', allergyController.updateAllergy);

module.exports = router;