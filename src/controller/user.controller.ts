import { NextFunction, Request, Response } from 'express';
import { DeleteResult } from 'typeorm';

import { IUser } from '../entity';
import { emailService, userService } from '../services';
import { emailActionEnum } from '../constants';
import { IRequestExtended } from '../interfaces';

class UserController {
  public async getUsers(req: Request, res: Response): Promise<Response<IUser[]>> {
    const users = await userService.getUsers();
    return res.json(users);
  }

  public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
    const { email } = req.params;
    const user = await userService.getUserByEmail(email);
    return res.json(user);
  }

  public async updateUserById(req: IRequestExtended, res: Response): Promise<Response<IUser>> {
    const { id } = req.params;

    if (req.user) {
      // console.log(req.user.email);
      await emailService.sendMail(req.user.email, emailActionEnum.PASSWORD_CHANGED, { userName: req.user.firstName });
    }

    const updatedUser = await userService.updateUserById(+id, req.body);
    return res.json(updatedUser);
  }

  public async softDeleteUserById(req:Request, res:Response): Promise<Response<DeleteResult>> {
    const { id } = req.params;
    const { email } = req.body;

    await emailService.sendMail(email, emailActionEnum.ACCOUNT_DELETED, { userName: email });

    const softDeletedUser = await userService.softDeleteUserById(id);
    return res.json(softDeletedUser);
  }

  public async getUserPagination(req:Request, res:Response, next: NextFunction) {
    try {
      const { page = 1, perPage = 25, ...other } = req.query;
      const userPagination = await userService.getUserPagination(other, +page, +perPage);

      res.json(userPagination);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
