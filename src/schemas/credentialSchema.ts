import joi from "joi";

export const credentialSchema = joi.object({
  url: joi
    .string()
    .pattern(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    )
    .required(),
  username: joi.string().max(50).required().trim(),
  password: joi.string().required(),
  title: joi.string().max(50).required().trim(),
});
