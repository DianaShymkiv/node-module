import { Joi, Segments } from 'celebrate';
import { commonValidators } from '../common/common.validators';

export const authValidator = {
    login: {
        [Segments.BODY]: Joi.object({
            email: commonValidators.emailValidator,
            password: Joi.string().required().min(2),
        }),
    },
};
