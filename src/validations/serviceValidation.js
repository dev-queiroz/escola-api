const Joi = require("joi");

const serviceSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  duration: Joi.number().integer().min(1).required(),
  price: Joi.number().positive().required(),
});

module.exports = { serviceSchema };
