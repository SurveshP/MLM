const Joi = require("joi");

// Define the validation schema
const connectionSchema = Joi.object({
  fromSponserId: Joi.string().required().messages({
    'any.required': 'fromId is required',
    'string.empty': 'fromId must not be empty',
  }),
  toSponserId: Joi.string().required().messages({
    'any.required': 'toId is required',
    'string.empty': 'toId must not be empty',
  }),
  connected: Joi.boolean().default(true),
  disabled: Joi.boolean().default(false)
}).messages({
  'object.unknown': 'Unknown field(s) in connection data'
});

// Validate the connection data
function validateConnection(connectionData) {
  return connectionSchema.validate(connectionData);
}

function validateUpdate(updateData) {
  return connectionSchema.validate(updateData);
}

module.exports = {
  validateConnection,
  validateUpdate,
};
