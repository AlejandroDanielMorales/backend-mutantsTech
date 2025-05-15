const express = require("express");
const productsController = require("../controllers/products.controller");
const router = express.Router();
const uploadMiddleware = require("../middlewares/uploadFile");
const uploadMiddlewareWebp = require("../middlewares/uploadFileWebp")

router.get("/products/search", productsController.getProductsByQuery);

router.get("/products", productsController.getAllProducts);

router.get("/products/:id", productsController.getProductById);

router.post("/products", [uploadMiddlewareWebp], productsController.createProduct);

router.put("/products/:id", [uploadMiddlewareWebp], productsController.updateProduct);

router.delete("/products/:id", productsController.deleteProduct);

module.exports = router;
