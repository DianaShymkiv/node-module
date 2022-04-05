import Joi from 'joi';

import { constants } from '../../constants';

export const commonValidators = {
  emailValidator: Joi
    .string()
    .required()
    .regex(constants.EMAIL_REGEXP)
    .trim(),
  phoneValidator: Joi
    .string()
    .required()
    .length(10)
    .regex(constants.PHONE_REGEXP),
  passwordValidator: Joi
    .string()
    .required()
    .min(2)
    .regex(constants.PASSWORD_REGEXP),
  nameValidator: Joi
    .string()
    .required()
    .min(2)
    .max(250),
  ageValidator: Joi
    .number()
    .min(0)
    .max(90),
};
