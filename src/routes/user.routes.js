const express = require('express');
const userController = require('../controllers/user.controller');
const {verifyToken} = require("../middlewares/verifyToken");
const verifyRole = require("../middlewares/verifyRole");
const router = express.Router();

// obtiene los usuarios existentes
router.get("/api/users", verifyToken, userController.getUsers)

// agrega un nuevo usuario
router.post("/api/users", verifyToken, verifyRole.isAdmin, userController.newUser)

// actualiza los roles de un usuario 
router.put("/api/users/:userId", verifyToken, verifyRole.isAdmin, userController.updateUserRoles)

// elimina un usuario
router.delete("/api/users/:userId", verifyToken, verifyRole.isAdmin, userController.deleteUser)

module.exports = router;