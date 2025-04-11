function getAllProducts(req, res) {
    // Logic to get all products
    res.send("All products");
}  
function createProduct(req, res) {
    // Logic to create a product
    res.send("Product created");
}
function updateProduct(req, res) {
    // Logic to update a product
    res.send("Product updated");
}
function deleteProduct(req, res) {  
    // Logic to delete a product
    res.send("Product deleted");
}
function getProductById(req, res) {
    // Logic to get a product by ID
    const { id } = req.params;
    res.send(`Product with ID: ${id}`);
}
module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
}