const express = require("express")
const categoryController = require("../controllers/category.controller.js")
const upload = require("../middlewares/uploadFile")
const router = express.Router();

router.get("/categories",categoryController.getAllCategories)

router.get("/categories/:id", categoryController.getCategoryById)  

router.post("/categories", [upload],categoryController.createCategory)

router.put("/categories/:id", [upload], categoryController.updateCategory)

router.delete("/categories/:id", categoryController.deleteCategory)


module.exports = router;
