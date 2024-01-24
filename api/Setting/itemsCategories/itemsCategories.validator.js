const Joi = require("joi");

// Define the validation schema
const itemsCategoriesSchema = Joi.object({
  itemCategoryName: Joi.string().trim().required().label("Item Category Name"),
  description: Joi.string().trim().label("Description"),
  createdAt: Joi.date().label("Created At"),
  updatedAt: Joi.date().label("Updated At"),
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
