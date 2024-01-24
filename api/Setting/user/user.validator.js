const Joi = require('joi');

const userSchema = Joi.object({
  company_id: Joi.string().required(), // Assuming company_id is a mongoose ObjectId string
  username: Joi.string().max(50).min(5).required().trim(),
  contactNumber: Joi.number().integer().min(1000000000).max(9999999999).required(),
  email_address: Joi.string().email().required(),
  password: Joi.string().min(6).required().trim(),
  active: Joi.boolean().default(true),
  del_status: Joi.string().valid('Live', 'Deleted').default('Live')
});

// Validate the area data
function validateUser(userData) {
  return userSchema.validate(userData);
}

function validateUpdate(updateData) {
  return userSchema.validate(updateData);
}

//Validate the user data
// function validateUser(userData) {
//   const { error, value } = userSchema.validate(userData);
//   if (error) {
//     const errorMessage = error.details.map((detail) => detail.message).join(", ");
//     throw new Error(errorMessage);
//   }
//   return value;
// }

// Validate the update data
// function validateUpdate(updateData) {
//   const { error, value } = userSchema.validate(updateData);
//   if (error) {const errorMessage = error.details.map((detail) => detail.message).join(", ");
//     throw new Error(errorMessage);
//   }
//   return value;
// }

module.exports = {
  validateUser,
  validateUpdate
};
