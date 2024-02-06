import CategoryModel from '../models/category.model.js';
import PlanModel from '../models/plan.model.js';
import { validateCreatePlan } from '../validators/plan.validator.js';

// Insert New category
export async function insertPlan(req, res) {
  try {
    const planData = req.body;

    // Validate category data before insertion
    const { error } = validateCreatePlan(planData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert Category with itemId
    const newPlan = new PlanModel(planData);
    const savedPlan = await newPlan.save();

    // Send Response
    res.status(200).json({ message: "New Plan Created", data: savedPlan });
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
export async function  ListPlans(req, res, next){
  try {
    let category = await CategoryModel.find({ disabled: "false" }).populate('parentCategory');
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


// Delete category
export async function  deletePlan(req, res, next){
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
