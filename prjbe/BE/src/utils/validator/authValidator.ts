import * as Joi from "joi";

export const registerSchema = Joi.object({
  userName: Joi.string().min(8).max(30).required(),
  fullName: Joi.string().min(8).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
