const express = require("express")
const usersController = require("../controllers/users.controller")
const router = express.Router();
const isAuth = require("../middlewares/isAuth")

router.post('/users/login', usersController.loginUser)
router.get("/users", usersController.getAllUsers)
router.post("/users", usersController.createUser)
router.put("/users/:id", isAuth,usersController.updateUser)
router.delete("/users/:id", usersController.deleteUser)
router.get('/users/:id', usersController.getUserById)


module.exports = router;