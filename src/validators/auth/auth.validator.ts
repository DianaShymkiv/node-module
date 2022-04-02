import * as Joi from 'joi';
import { commonValidators } from '../common/common.validators';

export const authValidator = {
    login: Joi.object({
        email: commonValidators.emailValidator.message('Email not valid').trim(),
        password: Joi.string().required().min(2).trim(),
    }),
};
