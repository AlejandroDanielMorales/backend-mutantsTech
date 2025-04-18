const express = require("express")
const productsController = require("../controllers/products.controller")
const router = express.Router();
const upload = require("../middlewares/uploadFile")

router.get("/products",productsController.getAllProducts)

router.get("/products/:id", productsController.getProductById)  

router.post("/products",[upload], productsController.createProduct)

router.put("/products/:id",[upload], productsController.updateProduct)

router.delete("/products/:id", productsController.deleteProduct)


module.exports = router;
