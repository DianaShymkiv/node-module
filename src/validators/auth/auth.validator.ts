import * as Joi from 'joi';
import { commonValidators } from '../common/common.validators';
import { errorMessages } from '../../constants/error.messages';

export const authValidator = {
  login: Joi.object({
    email: commonValidators.emailValidator,
    password: commonValidators.passwordValidator,
  }),

  registration: Joi.object({
    firstName: commonValidators.nameValidator,
    lastName: commonValidators.nameValidator,
    age: commonValidators.ageValidator.message(errorMessages.registration.age),
    phone: commonValidators.phoneValidator.message(errorMessages.registration.phone),
    email: commonValidators.emailValidator.message(errorMessages.registration.email),
    password: commonValidators.passwordValidator.message(errorMessages.registration.password),
  }),

  changePassword: Joi.object({
    password: commonValidators.passwordValidator,
  }),

  email: Joi.object({
    email: commonValidators.emailValidator,
  }),
};
