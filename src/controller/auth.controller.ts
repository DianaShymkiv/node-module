import { NextFunction, Response } from 'express';

import { UploadedFile } from 'express-fileupload';
import { IRequestExtended } from '../interfaces';
import {
  authService, emailService, s3Service, tokenService, userService,
} from '../services';
import {
  ActionTokenTypes, constants, emailActionEnum,
} from '../constants';
import { actionTokenRepository, tokenRepository } from '../repositories';
import { IUser } from '../entity';
import { ErrorHandler } from '../error';

class AuthController {
  public async registration(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const avatar = req.files?.avatar as UploadedFile;

      const userFromDB = await userService.getUserByEmail(email);
      if (userFromDB) {
        next(new ErrorHandler(`User with this email: ${email} already exists`));
        return;
      }
      const createdUser = await userService.createUser(req.body);

      await emailService.sendMail(email, emailActionEnum.REGISTRATION, { userName: req.user?.firstName });

      // UPLOAD PHOTO
      if (avatar) {
        const sendData = await s3Service.uploadFile(avatar, 'user', createdUser.id);

        console.log('_____________________________________');
        console.log(sendData.Location);
        console.log('_____________________________________');

      }

      const tokenData = await authService.registration(createdUser);

      res.json(tokenData);
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
    // console.log(req.user);
    const { id } = req.user as IUser;

    await tokenService.deleteUserTokenPair(id); // delete all tokens from all devices for userId

    return res.json('ok');
  }

  async login(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        id, email, password: hashPassword, firstName,
      } = req.user as IUser;
      const { password } = req.body;

      await emailService.sendMail(email, emailActionEnum.LOGIN, { userName: firstName });

      await userService.compareUserPasswords(password, hashPassword);

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

      await actionTokenRepository.createActionToken({ actionToken: token, type: ActionTokenTypes.FORGOT_PASSWORD, userId: id });

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
