const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.put('/:id', userController.updateUser);
router.delete("/:id", userController.deleteUser)

module.exports = router;