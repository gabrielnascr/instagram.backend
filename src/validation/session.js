import Joi from '@hapi/joi';

const signUpSchema = Joi.object({
  email: Joi.string().min(6).max(254).trim()
    .required(),
  name: Joi.string().min(3).max(128).trim()
    .required(),
  username: Joi.string().min(2).max(24).trim()
    .required(),
  password: Joi.string().min(4).trim().required(),
  passwordConfirmation: Joi.valid(Joi.ref('password')).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).max(254).trim(),
  username: Joi.string().min(2).max(24).trim(),
  password: Joi.string().min(4).trim().required(),
});

export { loginSchema, signUpSchema };
