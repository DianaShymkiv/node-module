import bcrypt from 'bcrypt';
import { DeleteResult, UpdateResult } from 'typeorm';

import { IUser } from '../entity';
import { userRepository } from '../repositories';
import { config } from '../config';

class UserService {
    public async createUser(user:IUser):Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    public async getUserByEmail(email:string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async compareUserPasswords(password:string, hash:string):Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('Wrong email  or password');
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
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
