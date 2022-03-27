import bcrypt from 'bcrypt';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    public async createUser(user:IUser):Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        const createUser = userRepository.createUser(dataToSave);
        return createUser;
    }

    public async getUserByEmail(email:string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public async getUsers() : Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async updateUserById(id:string, password: string, email: string):
        Promise<UpdateResult> {
        return userRepository.updateUserById(+id, password, email);
    }

    public async softDeleteUserById(id: string):Promise<DeleteResult> {
        return userRepository.softDeleteUserById(+id);
    }
}

export const userService = new UserService();
