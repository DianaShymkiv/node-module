import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories';
import { constants } from '../constants';

class AuthMiddleware {
    public async checkAccessToken(req:IRequestExtended, res:Response, next: NextFunction) {
        try {
            const accessToken = req.get(constants.AUTHIRIZATION);

            if (!accessToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                throw new Error('TokenEntity not valid');
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('TokenEntity not valid');
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
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDB = await tokenRepository.findByParams({ refreshToken });
            // find token in the DB

            if (!tokenPairFromDB) {
                throw new Error('TokenEntity not valid');
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('TokenEntity not valid');
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
}

export const authMiddleware = new AuthMiddleware();