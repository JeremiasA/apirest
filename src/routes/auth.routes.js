const express = require('express');
const authController = require('../controllers/auth.controller');
const verifyToken = require("../middlewares/verifyToken");
const verifyRole = require("../middlewares/verifyRole");
const router = express.Router();

//logearse
router.post("/api/login", authController.login)

//register
router.post("/api/register", authController.register)

module.exports = router;