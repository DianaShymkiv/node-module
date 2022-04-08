import bcrypt from 'bcrypt';
import { DeleteResult } from 'typeorm';

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

  public async getUsers() : Promise<IUser[]> {
    return userRepository.getUsers();
  }

  public async getUserPagination(filterObject: any, page: number, perPage: number) {
    return userRepository.getUserPagination(filterObject, perPage, page);
  }

  public async updateUserById(id: number, obj: Partial<IUser>): Promise<object | undefined> {
    if (obj.password) {
      obj.password = await this._hashPassword(obj.password);
    }

    return userRepository.updateUserById(id, obj);
  }

  public async compareUserPasswords(password:string, hash:string):Promise<void | Error> {
    const isPasswordUnique = await bcrypt.compare(password, hash);

    if (!isPasswordUnique) {
      throw new Error('UserEntity not exists');
    }
  }

  public async softDeleteUserById(id: string):Promise<DeleteResult> {
    return userRepository.softDeleteUserById(+id);
  }

  private async _hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
  }
}

export const userService = new UserService();
