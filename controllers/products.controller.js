const Product = require("../models/product.model");

// Obtener todos los productos
async function getAllProducts(req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Error fetching products" });
    }
}

// Crear un nuevo producto
async function createProduct(req, res) {
    try {
        
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "No data provided" });
        }
        const newProduct = new Product(req.body);
        newProduct.image = req.file.filename;
        console.log(req.file.filename)
        await newProduct.save();
        res.status(201).json({ message: "Product created", product: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Error creating product" });
    }
}

// Obtener un producto por ID
async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Error fetching product" });
    }
}

// Actualizar un producto por ID
async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Si no se sube nueva imagen, no modificar el campo
        if (!req.file) {
            delete updateData.image;
        } else {
            updateData.image = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product updated", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Error updating  product" });
    }
}


// Eliminar un producto por ID
async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted", product: deletedProduct });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Error deleting product" });
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};
