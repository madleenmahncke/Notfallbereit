const express = require('express');
const router = express.Router();

const authController = require('../controllers/AuthController');
const verifyToken = require("../middleware/VerifyToken");
const requireRole = require("../middleware/RequireRole");

router.post('/register', authController.register)
router.post("/login", authController.login)
router.post("/admin/paramedicRegister", authController.createParamedic)
router.post("/login/verifyParamedic", verifyToken, requireRole("PARAMEDIC"), authController.verifyParamedic)

module.exports = router;