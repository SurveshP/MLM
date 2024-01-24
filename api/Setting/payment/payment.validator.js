const Joi = require("joi");

// Define the validation schema
const paymentSchema = Joi.object({
  userId: Joi.string().required(), // Assuming userId is a string, adjust if needed
  paymentMode: Joi.string().valid('Cash', 'CreditCard', 'DebitCard', 'Other').default('Cash'),
  amountPaid: Joi.string().required(),
  active: Joi.boolean().default(true),
  createdAt: Joi.date().default(Date.now),
  del_status: Joi.string().valid('Live', 'Deleted').default('Live')
});

// Validate the payment data
function validatePayment(paymentData) {
  return paymentSchema.validate(paymentData);
}

function validateUpdate(updateData) {
  return paymentSchema.validate(updateData);
}

// function validatePayment(paymentData) {
//   const { error, value } = paymentSchema.validate(paymentData);
//   if (error) {
//     const errorMessage = error.details.map((detail) => detail.message).join(", ");
//     throw new Error(errorMessage);
//   }
//   return value;
// }

// // Validate the update data
// function validateUpdate(updateData) {
//   const { error, value } = paymentSchema.validate(updateData);
//   if (error) {const errorMessage = error.details.map((detail) => detail.message).join(", ");
//     throw new Error(errorMessage);
//   }
//   return value;
// }

module.exports = {
  validatePayment,
  validateUpdate,
};
