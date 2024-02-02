import Joi from "joi";

// Validate the payment data
export function validateCreatePayment(paymentData) {
  const paymentSchema = Joi.object({
    userId: Joi.string().required(),
    orderId: Joi.string().required(),
    paymentMode: Joi.string(),
    amountPaid: Joi.number()
  });

  const { error } = paymentSchema.validate(paymentData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}

// Validate the update data
export function validateUpdatePayment(updateData) {
  const paymentSchema = Joi.object({
    paymentMode: Joi.string().required(),
    amountPaid: Joi.number()
  });

  const { error } = paymentSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


