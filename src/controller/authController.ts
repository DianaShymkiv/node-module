import { Request, Response } from 'express';
import { authService } from '../services/authService';

class AuthController {
    public async registration(req:Request, res: Response) {
        const data = await authService.registration(req.body);
        res.cookie(
            'refreshToken',
            data.refreshToken,
            { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true },
            // час в мілісекундах, httpOnly - щоб не можна було в cookie писати на js
            // в data приходить tokenPair з якої ми дістаємо refreshToken
        );

        return res.json(data);
    }
}

export const authController = new AuthController();
