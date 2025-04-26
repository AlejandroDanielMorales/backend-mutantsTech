const express = require("express")
const productsController = require("../controllers/products.controller")
const router = express.Router();
const uploadMiddleware = require("../middlewares/uploadFile")

router.get("/products",productsController.getAllProducts)

router.get("/products/:id", productsController.getProductById)  

router.post("/products",[uploadMiddleware], productsController.createProduct)

router.put("/products/:id",[uploadMiddleware], productsController.updateProduct)

router.delete("/products/:id", productsController.deleteProduct)


module.exports = router;
