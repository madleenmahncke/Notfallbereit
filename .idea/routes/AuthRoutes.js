const express = require('express');
const router = express.Router();

const authController = require('../controllers/AuthController');

router.post('/register', authController.register)
router.post("/login", authController.login)
router.post("/admin/paramedicRegister", authController.createParamedic)

module.exports = router;