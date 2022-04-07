import { NextFunction, Response } from 'express';

import { IRequestExtended, ITokenData } from '../interfaces';
import { authService, emailService, tokenService, userService } from '../services';
import { ActionTokenTypes, constants, COOKIE, emailActionEnum } from '../constants';
import { actionTokenRepository, tokenRepository } from '../repositories';
import { IUser } from '../entity';

class AuthController {
  public async registration(req: IRequestExtended, res: Response): Promise<Response<ITokenData>> {
    const data = await authService.registration(req.body);
    const { userEmail: email } = data;

    await emailService.sendMail(email, emailActionEnum.REGISTRATION, { userName: req.user?.firstName });

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

    await tokenService.deleteUserTokenPair(id); // delete all tokens from all devices for userId

    return res.json('ok');
  }

  async login(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, email, password: hashPassword, firstName } = req.user as IUser;
      const { password } = req.body;

      await emailService.sendMail(email, emailActionEnum.LOGIN, { userName: firstName });

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
      next(e);
    }
  }

  async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { id, email } = req.user as IUser;
      const refreshTokenToDelete = req.get('Authorization');

      await tokenService.deleteUserTokenPairByParams({ refreshToken: refreshTokenToDelete });

      const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

      await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

      res.json({
        refreshToken,
        accessToken,
        user: req.user,
      });
    } catch (e) {
      next(e);
    }
  }

  async sendForgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { id, email, firstName } = req.user as IUser;

      const token = tokenService.generateActionToken({ userId: id, userEmail: email });

      await actionTokenRepository.createActionToken({ actionToken: token, type: ActionTokenTypes.FORGOT_PASSWORD, userId: id});

      await emailService.sendMail(email, emailActionEnum.FORGOT_PASSWORD, {
        userName: firstName,
        token,
      });

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  async setPassword(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { id, email, firstName } = req.user as IUser;
      const actionToken = req.get(constants.AUTHIRIZATION);

      await userService.updateUserById(id, req.body);
      await actionTokenRepository.deleteByParams({ actionToken });

      await emailService.sendMail(email, emailActionEnum.PASSWORD_CHANGED, {
        userName: firstName,
      });


      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }

}

export const authController = new AuthController();
