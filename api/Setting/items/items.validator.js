const Joi = require("joi");

// Define the validation schema
const itemsSchema = Joi.object({
  company_id: Joi.string().required().label("Company ID"),
  itemName: Joi.string().trim().required().label("Item Name"),
  description: Joi.string().trim().required().label("Description"),
  price: Joi.number().min(0).required().label("Price"),
  quantityInStock: Joi.number().min(0).required().label("Quantity in Stock"),
  isAvailable: Joi.boolean().default(true).label("Is Available"),
  createdAt: Joi.date().label("Created At"),
  updatedAt: Joi.date().allow(null).label("Updated At"),
  itemsCategories_id: Joi.string().required(),
  del_status: Joi.string().valid("Live", "Deleted").default("Live").label("Delete Status"),
});

// Validate the items data
function validateItems(itemsData) {
  return itemsSchema.validate(itemsData);
}

function validateUpdate(updateData) {
  return itemsSchema.validate(updateData);
}

module.exports = {
  validateItems,
  validateUpdate,
};
