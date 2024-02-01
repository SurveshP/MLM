// userValidation.js
import Joi from 'joi';

export const userSchema = Joi.object({
  admin_id: Joi.string().required(),
  fromSponsorId: Joi.string(),
  userName: Joi.string().required(),
  contactNumber: Joi.number(),
  location: Joi.string(),
  emailAddress: Joi.string().email().required(),
  position: Joi.string().valid('Left', 'Right').required(),
  type: Joi.string().required(),
  password: Joi.string().required(),
  disabled: Joi.boolean().default(false),
});

// Validate the user data
export function validateCreateUser(userData) {
  const { error, value } = userSchema.validate(userData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return value;
}

// Validate the update data
export function validateUpdateUser(updateData) {
  const { error, value } = userSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return value;
}
