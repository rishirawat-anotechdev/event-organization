import Category from '../models/categoriesModel.js';
import Event from '../models/EventModel.js';

// Create a new category
export const createCategory = async (req, res) => {
    const { title } = req.body;

    try {
        // Check if there are already 6 categories
        const categoryCount = await Category.countDocuments();
        if (categoryCount >= 6) {
            return res.status(400).json({ message: 'Maximum of 6 categories allowed' });
        }

        const newCategory = new Category({ title });
        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.title = title || category.title;
        await category.save();
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Delete all events related to the category
        await Event.deleteMany({ category: id });

        // Delete the category itself
        await Category.findByIdAndDelete(id);

        res.status(200).json({ message: 'Category and its associated events deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category and events', error });
    }
};
