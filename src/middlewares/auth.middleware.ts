import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories';
import { constants } from '../constants';
import { authValidator } from '../validators';
import { ErrorHandler } from '../error';

class AuthMiddleware {
    public async checkAccessToken(req:IRequestExtended, res:Response, next: NextFunction) {
        try {
            const accessToken = req.get(constants.AUTHIRIZATION);

            if (!accessToken) {
                next(new ErrorHandler('No token', 400));
                return;
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid', 401));
                return;
                // токен розшифрувався але такого немає в базі
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.status(401).json({
                status: 401,
                message: e.message,
            });
        }
    }

    public async checkRefreshToken(req:IRequestExtended, res:Response, next: NextFunction) {
        try {
            const refreshToken = req.get(constants.AUTHIRIZATION);

            if (!refreshToken) {
                next(new ErrorHandler('No token', 400));
                return;
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });
            // find token in the DB

            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token not valid', 401));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token not valid', 401));
                return;
                // токен розшифрувався але такого немає в базі
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.status(401)
                .json({
                    status: 401,
                    message: e.message,
                });
        }
    }

    // VALIDATORS
    public isLoginValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error, value } = authValidator.login.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 400));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
