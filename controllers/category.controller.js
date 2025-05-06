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
        newCategory.image = req.file.filename;
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

        const updateData = {};

        // Solo permitir actualizar la descripción
        if (req.body.description) {
            updateData.description = req.body.description;
        }

        // Y la imagen si se subió una nueva
        if (req.file) {
            updateData.image = req.file.filename;
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json({ message: "Category updated", category: updatedCategory });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Error updating category" });
    }
}


module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  deleteCategory,
  updateCategory
};