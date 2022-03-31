import * as Joi from 'joi';
import { regExr } from '../constants';

export const userValidators = {
    createUser: Joi.object({
        firstName: Joi
            .string()
            .min(2)
            .max(20)
            .required(),
        lastName: Joi
            .string()
            .min(2)
            .max(20)
            .required(),
        age: Joi
            .number()
            .min(18),
        phone: Joi
            .string()
            .regex(regExr.PHONE)
            .required(),
        email: Joi
            .string()
            .regex(regExr.EMAIL)
            .trim()
            .required(),
        password: Joi
            .string()
            .regex(regExr.PASSWORD)
            .required(),
    }),

    loginUser: Joi.object({
        email: Joi
            .string()
            .regex(regExr.EMAIL)
            .trim()
            .required(),
        password: Joi
            .string()
            .regex(regExr.PASSWORD)
            .required(),
    }),
};
