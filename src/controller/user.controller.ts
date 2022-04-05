import { Request, Response } from 'express';
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

  public async updateUserPasswordById(req: IRequestExtended, res: Response): Promise<Response<IUser>> {
    const { password } = req.body;
    const { id } = req.params;

    if (req.user) {
      // console.log(req.user.email);
      await emailService.sendMail(req.user.email, emailActionEnum.PASSWORD_CHANGED);
    }

    const updatedUser = await userService.updateUserPasswordById(id, password);
    return res.json(updatedUser);
  }

  public async softDeleteUserById(req:Request, res:Response): Promise<Response<DeleteResult>> {
    const { id } = req.params;
    const { email } = req.body;

    await emailService.sendMail(email, emailActionEnum.ACCOUNT_DELETED);

    const softDeletedUser = await userService.softDeleteUserById(id);
    return res.json(softDeletedUser);
  }
}

export const userController = new UserController();
