import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../../entity';

export interface IUserRepository {
    getUsers(): Promise<IUser[]>;
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email:string): Promise<IUser | undefined>;
    updateUserById(id: number, password: string, email: string): Promise<UpdateResult>;
    softDeleteUserById(id:number):Promise<DeleteResult>;
}
