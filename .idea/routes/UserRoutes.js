const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const verifyToken = require("../middleware/VerifyToken");
const requireRole = require("../middleware/RequireRole");

router.get('/getUser', verifyToken, requireRole("PATIENT"), userController.getUser)
router.put('/:id', verifyToken, requireRole("PATIENT"), userController.updateUser);
router.delete("/:id", verifyToken, requireRole("PATIENT"), userController.deleteUser)

module.exports = router;