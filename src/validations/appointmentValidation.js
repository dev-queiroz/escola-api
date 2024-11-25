const Joi = require("joi");

const appointmentSchema = Joi.object({
  service_id: Joi.string().guid({ version: "uuidv4" }).required(),
  provider_id: Joi.string().guid({ version: "uuidv4" }).required(),
  appointment_time: Joi.date().iso().required(),
  customer_name: Joi.string().min(3).max(100).required(),
  customer_email: Joi.string().email().required(),
});

module.exports = { appointmentSchema };
