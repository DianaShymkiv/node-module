import { Request, Response } from 'express';

import { IRequestExtended, ITokenData } from '../interfaces';
import { authService, tokenService, userService } from '../services';
import { COOKIE } from '../constants';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            // час в мілісекундах, httpOnly - щоб не можна було в cookie писати на js
            // в data приходить tokenPair з якої ми дістаємо refreshToken
        );

        return res.json(data);
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        // console.log(req.user);
        const { id } = req.user as IUser;

        await tokenService.deleteUserTokenPair(id);

        return res.json('ok');
    }

    async login(req: IRequestExtended, res: Response): Promise<void> {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPasswords(password, hashPassword);
            // вертати нічого не потрібно, якщо співпадають то добре і пішли далі якщо ні то впаде помилка

            const { refreshToken, accessToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const authController = new AuthController();