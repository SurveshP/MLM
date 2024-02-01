import CategoryModel from '../models/category.model.js';
import { validateCreateCategory, validateUpdateCategory } from '../validators/category.validator.js';

// Insert New category
export async function insertCategory(req, res) {
  try {
    const categoryData = req.body;

    // Validate category data before insertion
    const { error } = validateCreateCategory(categoryData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert Category with itemId
    const newCategory = new CategoryModel(categoryData);
    const savedCategory = await newCategory.save();

    // Send Response
    res.status(200).json({ message: "Category data inserted", data: savedCategory });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Something went wrong",
      });
  }
};

// Display List
export async function  ListCategorys(req, res, next){
  try {
    let category = await CategoryModel.find({ disabled: "false" });
    if (!category || category.length === 0) {
      console.log('categoryr not found');
      return res.status(404).json({ message: 'category not found' });
    }
    res.status(200).json({ message: "success", category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Display Single category
export async function  showCategory(req, res, next){
  try {
    let id = req.params.id; // Assuming the parameter is categoryId
    let category = await CategoryModel.findOne({_id: id});

    if (!category) {
      console.log('Category not found');
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving category' });
  }
};

// Update category
export async function updateCategory(req, res, next) {
  try {
    const id = req.params.id;
    const categoryDataToUpdate = req.body;

    // Validate the update data
    const { error } = validateUpdateCategory(categoryDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing category by ID using Mongoose
    const existingCategory = await CategoryModel.findOne({ _id: id });

    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Update only the fields that are present in the request body
    Object.assign(existingCategory, categoryDataToUpdate);

    // Save the updated category
    const updatedCategory = await existingCategory.save();

    // Send the updated category as JSON response
    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


// Delete category
export async function  deleteCategory(req, res, next){
  try {
    let id = req.params.id;

    const updatedCategory = await CategoryModel.findOneAndUpdate(
      { _id: id },
      { disabled: "true" },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
