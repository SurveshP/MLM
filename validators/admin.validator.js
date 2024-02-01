import Joi from "joi";

// Define the validation schema
const adminSchema = Joi.object({
  adminName: Joi.string().required(),
  contactNumber: Joi.number().required(),
  emailAddress: Joi.string().email().required(),
  password: Joi.string().required()
});

// Validate the admin data
export function validateCreateAdmin(adminData) {
  const { error, value } = adminSchema.validate(adminData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return value;
}

// Validate the update data
export function validateUpdateAdmin(updateData) {
  const { error, value } = adminSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return value;
}
