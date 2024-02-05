import Joi from "joi";

// Validate the category data
export function validateCreateCategory(categoryData) {
  const categorySchema = Joi.object({
    categoryName: Joi.string().required(),
    description: Joi.string().required(),
    parentCategory: Joi.string()
  });

  const { error } = categorySchema.validate(categoryData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}

// Validate the update data
export function validateUpdateCategory(updateData) {
  const categorySchema = Joi.object({
    description: Joi.string().required()
  });

  const { error } = categorySchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


