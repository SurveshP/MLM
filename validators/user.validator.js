import Joi from 'joi';

const validateCreateUser = Joi.object().keys({
  company_id: Joi.string().required(),
  fromSponsorId: Joi.string().required(),
  userName: Joi.string().required(),
  contactNumber: Joi.number().required(),
  location: Joi.string(),
  emailAddress: Joi.string().email().required(),
  position: Joi.string().valid('Left', 'Right').required(),
  type: Joi.string().valid('Admin', 'User').required(),
  password: Joi.string().required(),
  disabled: Joi.boolean().default(false),
});

const validateUpdateUser = Joi.object().keys({
  company_id: Joi.string().required(),
  fromSponsorId: Joi.string(),
  userName: Joi.string(),
  contactNumber: Joi.number(),
  location: Joi.string(),
  emailAddress: Joi.string().email(),
  password: Joi.string().required(),
  disabled: Joi.boolean().default(false),
});

export { validateCreateUser, validateUpdateUser };
