import { NextFunction, Response } from 'express';

import { ErrorHandler } from '../error';
import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';
import { authValidator } from '../validators';

class UserMiddleware {
  async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction):
        Promise<void> {
    try {
      const userFromDB = await userRepository.getUserByEmail(req.body.email);

      if (!userFromDB) {
        next(new ErrorHandler('User not found', 404));
        return;
      }

      req.user = userFromDB;
      next();
    } catch (e) {
      next(e);
    }
  }

  async getEmailByUserId(req: IRequestExtended, res: Response, next: NextFunction) :Promise<void> {
    try {
      const user = await userRepository.getUserById(+req.params.id);

      if (!user) {
        next(new ErrorHandler('User not found', 404));
        return;
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  // VALIDATORS
  public isChangedPasswordValid(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      const { error, value } = authValidator.changePassword.validate(req.body);

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

export const userMiddleware = new UserMiddleware();
