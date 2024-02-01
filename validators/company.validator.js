import Joi from "joi";

// Define the validation schema
const validateCreateCompany = Joi.object().keys({
  companyName: Joi.string().required(),
  contactNumber: Joi.number().integer().required(),
  emailAddress: Joi.string().email().required(),
  userSponser_id: Joi.string(),
  // itemId: Joi.array().items(Joi.string()).messages({
  //   'array.base': 'Item IDs must be an array of strings.',
  // })
});

// Define the validation schema
const validateUpdateCompany = Joi.object().keys({
  companyName: Joi.string().required(),
  contactNumber: Joi.number().integer().required(),
  emailAddress: Joi.string().email().required(),
  userSponser_id: Joi.string(),
  // itemId: Joi.array().items(Joi.string()).messages({
  //   'array.base': 'Item IDs must be an array of strings.',
  // })
});

export { validateCreateCompany, validateUpdateCompany };
