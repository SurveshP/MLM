// supportValidation.js
import Joi from 'joi';

// Validate the support data
export function validateCreateSupport(supportData) {
  const supportSchema = Joi.object({
    userId: Joi.string().required(),
    ticketToken: Joi.string(),
    description: Joi.string().required()
  });


  const { error } = supportSchema.validate(supportData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return {error};
}

// Validate the update data
export function validateUpdateSupport(updateData) {
  const supportSchema = Joi.object({
    description: Joi.string()
  });
  
  const { error } = supportSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return {error};
}
