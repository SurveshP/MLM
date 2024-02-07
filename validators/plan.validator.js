import Joi from "joi";

// Validate the category data
export function validateCreatePlan(planData) {
  const planSchema = Joi.object({
    planName: Joi.string().required(),
  });

  const { error } = planSchema.validate(planData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}