// accountValidation.js
import Joi from 'joi';

// Validate the account data
export function validateCreateAccount(accountData) {
  const accountSchema = Joi.object({
    userId: Joi.string().required(),
    paymentType: Joi.string().required(),
    bankName: Joi.string().required(),
    accountNo: Joi.number().required(),
    accountHolderName: Joi.string().required(),
    accountType: Joi.string().required(),
    bankBranch: Joi.string().required(),
    default: Joi.boolean()
  });


  const { error } = accountSchema.validate(accountData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return {error};
}

// Validate the update data
export function validateUpdateAccount(updateData) {
  const accountSchema = Joi.object({
    userId: Joi.string(),
    paymentType: Joi.string(),
    bankName: Joi.string(),
    accountNo: Joi.number(),
    accountHolderName: Joi.string(),
    accountType: Joi.string(),
    bankBranch: Joi.string(),
    default: Joi.boolean()
  });
  
  const { error } = accountSchema.validate(updateData);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    throw new Error(errorMessage);
  }
  return {error};
}
