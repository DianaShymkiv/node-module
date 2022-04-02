import { NextFunction, Response } from 'express';

import { ErrorHandler } from '../error';
import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<void> {
        try {
            const userFromDB = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDB) {
                next(new ErrorHandler('User not found', 404));
                // передбачена помилка
                return;
            }

            req.user = userFromDB;
            next();
        } catch (e) {
            next(e);
            // в catch будуть падати помилки які не змогли передбачити
        }
    }
}

export const userMiddleware = new UserMiddleware();
