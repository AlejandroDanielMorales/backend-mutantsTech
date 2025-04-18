const express = require("express")
const categoryController = require("../controllers/category.controller.js")
const router = express.Router();

router.get("/categories",categoryController.getAllCategories)

router.get("/categories/:id", categoryController.getCategoryById)  

router.post("/categories", categoryController.createCategory)

router.put("/categories/:id", categoryController.updateCategory)

router.delete("/categories/:id", categoryController.deleteCategory)


module.exports = router;
