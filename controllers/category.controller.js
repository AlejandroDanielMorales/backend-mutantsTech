const Category = require("../models/category.model");

async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Error fetching categories" });
  }
}

async function createCategory(req, res) {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "No data provided" });
        }
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json({ message: "Category created", category: newCategory });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Error creating category" });
    }
}

async function getCategoryById(req, res) {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ error: "Error fetching category" });
    }
}


async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json({ message: "Category deleted" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Error deleting category" });
    }
}

async function updateCategory(req, res) {
try {
    const { id } = req.params;
    const body  = req.body;
    const category = await Category.findByIdAndUpdate(id,body);
    if (!user) {
      return res.status(404).json({ error: "Categoria no encontrada" });
    }
     return res.status(200).send({ message: "Categoria actualizada" , category : category});
  }
  catch (error) {
    console.error("Error en updateCategory:", error);
    res.status(500).json({ error: "Error al actualizar categoria" });
  }
    
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  deleteCategory,
  updateCategory
};