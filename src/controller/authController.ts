import { Request, Response } from 'express';

import { IRequestExtended, ITokenData } from '../interfaces';
import { authService, tokenService } from '../services';
import { COOKIE } from '../constants';
import { IUser } from '../entity';

class AuthController {
    public async registration(req:Request, res: Response): Promise<Response<ITokenData>> {
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

    public async logout(req:IRequestExtended, res:Response): Promise<Response<string>> {
        // console.log(req.user);
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteUserTokenPair(id);

        return res.json('ok');
    }
}

export const authController = new AuthController();
