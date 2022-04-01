import { Joi } from 'celebrate';
import { constants } from '../../constants';

export const commonValidators = {
    emailValidator: Joi.string().required().regex(constants.EMAIL_REGEXP),
};