import Joi from "joi";

// Creating joi validation for each column that user can fill
const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(120).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(0).max(120).required(),
});

export default userValidationSchema;
