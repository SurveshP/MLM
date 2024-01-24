const Joi = require("joi");

// Define the validation schema
const companySchema = Joi.object({
  companyName: Joi.string().max(50).min(5).required().trim(),
  contactNumber: Joi.number().integer().min(1000000000).max(9999999999).required(),
  email_address: Joi.string().email().required(),
  active: Joi.boolean().default(true),
  del_status: Joi.string().valid('Live', 'Deleted').default('Live'),
  user_id: Joi.array().items(Joi.string().required())
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
