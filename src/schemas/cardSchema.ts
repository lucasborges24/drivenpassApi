import joi from "joi";

export const CardSchema = joi.object({
  number: joi.string().creditCard().required(),
  securityCode: joi
    .string()
    .pattern(/^[0-9]{3}$/)
    .required(),
  cardholderName: joi.string().required(),
  expirationDate: joi
    .string()
    .pattern(/^(0[1-9]|1[0-2])(\/|-)([0-9]{2})$/)
    .required(),
  password: joi.string().required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid("credit", "debit", "both").required(),
  title: joi.string().max(50).required().trim(),
});
