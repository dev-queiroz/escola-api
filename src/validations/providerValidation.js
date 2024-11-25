const Joi = require("joi");

const providerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
});

module.exports = { providerSchema };
