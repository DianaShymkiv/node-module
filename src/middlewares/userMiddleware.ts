import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';
import { paramsValidators, userValidators } from '../validators';

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<void> {
        try {
            const userFromDB = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDB) {
                res.status(404).json('User not found');
                return;
            }

            req.user = userFromDB;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async validator(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = await userValidators.createUser.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async loginValidator(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = await userValidators.loginUser.validate(req.body);

            if (error) {
                throw new Error('Wrong password or email');
            }

            req.body = value;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async idValidator(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = await paramsValidators.id.validate(req.params);

            if (error) {
                throw new Error('Wrong password or email');
            }

            req.body = value;
            next();
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
