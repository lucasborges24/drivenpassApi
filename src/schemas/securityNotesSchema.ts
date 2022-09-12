import joi from "joi";

export const securityNotesSchema = joi.object({
  title: joi.string().max(50).required().trim(),
  description: joi.string().max(1000).required().trim(),
});
