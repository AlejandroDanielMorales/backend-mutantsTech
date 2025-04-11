const express = require("express")
const productsController = require("../controllers/products.controller")
const router = express.Router();

router.get("/products",productsController.getAllProducts)
router.get("/products/:id", productsController.getProductById)  
router.post("/products", productsController.createProduct)
router.put("/products/:id", productsController.updateProduct)
router.delete("/products/:id", productsController.deleteProduct)


module.exports = router;
