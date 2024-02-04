import Joi from "joi";

// Validate the order data
export function validateCreateOrder(orderData) {
  const orderSchema = Joi.object({
    userId: Joi.string().required(),
    product: Joi.array().items(Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(0).default(0).required()
    })).required(),
    deliveryAddress: Joi.string().required(),
    orderStatus: Joi.string()
  });

  const { error } = orderSchema.validate(orderData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}

// Validate the update data
export function validateUpdateOrder(updateData) {
  const orderSchema = Joi.object({
    orderStatus: Joi.string().required(),
    deliveryAddress: Joi.string().required(),
  });

  const { error } = orderSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


