const express = require("express")
const usersController = require("../controllers/users.controller")
const router = express.Router();
const isAuth = require("../middlewares/isAuth")
const uploadMiddleware = require("../middlewares/uploadFile")

router.post('/users/login', usersController.loginUser)

router.delete("/users/:id", usersController.deleteUser)

router.post("/users",[uploadMiddleware], usersController.createUser)

router.get("/users", usersController.getAllUsers)

router.get('/users/:id', usersController.getUserById)

router.put("/users/:id", [isAuth,uploadMiddleware],usersController.updateUser)

router.put("/users/editMyProfile/:id", [uploadMiddleware],usersController.updateUserByUser)


module.exports = router;