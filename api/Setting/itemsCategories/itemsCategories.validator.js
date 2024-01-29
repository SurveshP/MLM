const Joi = require("joi");

// Define the validation schema
const itemsCategoriesSchema = Joi.object({
  itemCategoryName: Joi.string().trim().required().messages({
    'any.required': 'Please enter the item category name',
    'string.empty': 'Please enter the item category name',
  }),
  description: Joi.string().trim().label("Description"),
  del_status: Joi.string().valid("Live", "Deleted").default("Live").label("Delete Status"),
});

// Validate the itemsCategories data
function validateItemsCategories(itemsCategoriesData) {
  return itemsCategoriesSchema.validate(itemsCategoriesData);
}

function validateUpdate(updateData) {
  return itemsCategoriesSchema.validate(updateData);
}

module.exports = {
  validateItemsCategories,
  validateUpdate,
};
