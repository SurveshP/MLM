const Joi = require("joi");

// Define the validation schema
const ordersSchema = Joi.object({
  userId: Joi.string().required().label("User ID"),
  items: Joi.array().items(
    Joi.object({
      itemsId: Joi.string().required().label("Items ID"),
      quantity: Joi.number().min(0).default(0).label("Quantity"),
    })
  ).label("Items"),
  orderDate: Joi.date().label("Order Date"),
  status: Joi.string().valid('Pending', 'Processing', 'Completed').default('Pending').label("Status"),
  createdAt: Joi.date().label("Created At"),
  del_status: Joi.string().valid('Live', 'Deleted').default('Live').label("Delete Status"),
});

// Validate the orders data
function validateOrders(ordersData) {
  return ordersSchema.validate(ordersData);
}

function validateUpdate(updateData) {
  return ordersSchema.validate(updateData);
}

module.exports = {
  validateOrders,
  validateUpdate,
};
