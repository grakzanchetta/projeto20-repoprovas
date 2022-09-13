import Joi from "joi";

export const createNewUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
});
