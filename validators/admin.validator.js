import Joi from "joi";

// Validate the admin data
export function validateCreateAdmin(adminData) {
  const adminSchema = Joi.object({
    adminName: Joi.string().required(),
    contactNumber: Joi.number().required(),
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required(),
    walletAmount: Joi.number(),
    type: Joi.string().valid('Add', 'WithDrawal')
  });

  const { error } = adminSchema.validate(adminData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}

// Validate the update data
export function validateUpdateAdmin(updateData) {
  const adminSchema = Joi.object({
    adminName: Joi.string(),
    contactNumber: Joi.number(),
    emailAddress: Joi.string().email(),
    password: Joi.string()
  });

  const { error } = adminSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return { error };
}


