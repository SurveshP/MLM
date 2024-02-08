import PlanModel from "../models/plan.model.js";
import { validateCreatePlan } from "../validators/plan.validator.js";

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
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}

// Display List
export async function ListPlans(req, res, next) {
  try {
    let plans = await PlanModel.find();
    if (!plans || plans.length === 0) {
      return res.status(404).json({ message: "plans not found" });
    }
    res.status(200).json({ message: "success", plans });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Display Active List
export async function ListActivePlans(req, res) {
  try {
    let plans = await PlanModel.find({ active: true });
    if (!plans || plans.length === 0) {
      return res.status(404).json({ message: "plans not found" });
    }
    res.status(200).json({ message: "success", plans });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Display InActive List
export async function ListInActivePlans(req, res) {
  try {
    let plans = await PlanModel.find({ active: false });
    if (!plans || plans.length === 0) {
      return res.status(404).json({ message: "No In-active plans found" });
    }
    res.status(200).json({ message: "success", plans });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Activate or Deactivate plan
export async function updatePlan(req, res) {
  try {
    const id = req.params.id;

    const plan = await PlanModel.findById(id);

    if (!plan) {
      return res.status(404).json({ success: false, error: "plan not found" });
    }

    plan.active = !plan.active;

    await plan.save();

    res
      .status(200)
      .json({
        message: `Plan ${plan.active == true ? "activated" : "deactivated"}`,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}

// Delete Plan
export async function deletePlan(req, res) {
  try {
    let id = req.params.id;

    const plan = await PlanModel.findByIdAndRemove(id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}
