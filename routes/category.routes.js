const express = require("express")
const categoryController = require("../controllers/category.controller.js")
const uploadMiddleware = require("../middlewares/uploadFile")
const router = express.Router();

router.get("/categories",categoryController.getAllCategories)

router.get("/categories/:id", categoryController.getCategoryById)  

router.post("/categories", [uploadMiddleware],categoryController.createCategory)

router.put("/categories/:id", [uploadMiddleware], categoryController.updateCategory)

router.delete("/categories/:id", categoryController.deleteCategory)


module.exports = router;
