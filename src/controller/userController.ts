import { Request, Response } from 'express';
import { DeleteResult } from 'typeorm';

import { IUser } from '../entity';
import { userService } from '../services';

class UserController {
    public async getUsers(req: Request, res: Response): Promise<Response<IUser[]>> {
        const users = await userService.getUsers();
        return res.json(users);
    }

    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async updateUserById(req: Request, res: Response): Promise<Response<IUser>> {
        const { password, email } = req.body;
        const { id } = req.params;
        const updatedUser = await userService.updateUserById(id, password, email);
        return res.json(updatedUser);
    }

    public async softDeleteUserById(req:Request, res:Response): Promise<Response<DeleteResult>> {
        const { id } = req.params;
        const softDeletedUser = await userService.softDeleteUserById(id);
        return res.json(softDeletedUser);
    }
}

export const userController = new UserController();
