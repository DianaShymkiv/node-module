import Joi from 'joi';

import { constants } from '../../constants';

export const commonValidators = {
    emailValidator: Joi.string().required().regex(constants.EMAIL_REGEXP),
};
