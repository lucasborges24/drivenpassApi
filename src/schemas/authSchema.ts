import joi from "joi";

const MIN_LENGTH_PASSWORD = 10;

export const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(MIN_LENGTH_PASSWORD).required(),
});

export const signInSchema = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().min(MIN_LENGTH_PASSWORD).required(),
  });
