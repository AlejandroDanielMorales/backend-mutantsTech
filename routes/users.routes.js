const express = require("express")
const usersController = require("../controllers/users.controller")
const router = express.Router();

router.get("/users", usersController.getAllUsers)
router.post("/users", usersController.createUser)
router.put("/users/:id", usersController.updateUser)        
router.delete("/users/:id", usersController.deleteUser)
router.get('/users/:id', usersController.getUserById)

module.exports = router;