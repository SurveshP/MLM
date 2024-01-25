const Joi = require("joi");

// Define the validation schema
const companySchema = Joi.object({
  companyName: Joi.string().required().messages({
    'any.required': 'Company Name is required.',
    'string.base': 'Company Name must be a string.',
  }),
  contactNumber: Joi.number().integer().required().messages({
    'any.required': 'Contact Number is required.',
    'number.base': 'Contact Number must be a number.',
    'number.integer': 'Contact Number must be an integer.',
  }),
  emailAddress: Joi.string().email().required().messages({
    'any.required': 'Email Address is required.',
    'string.base': 'Email Address must be a string.',
    'string.email': 'Email Address must be a valid email.',
  }),
  type: Joi.string().valid('Admin', 'User').required().messages({
    'any.required': 'Type is required.',
    'string.base': 'Type must be a string.',
    'any.only': 'Type must be either Admin or User.',
  }),
  userId: Joi.string().messages({
    'string.base': 'User ID must be a string.',
  }),
  itemId: Joi.array().items(Joi.string()).messages({
    'array.base': 'Item IDs must be an array of strings.',
  })
});

// Validate the company data
function validateCompany(companyData) {
  return companySchema.validate(companyData);
}

function validateUpdate(updateData) {
  return companySchema.validate(updateData);
}

module.exports = {
  validateCompany,
  validateUpdate,
};
