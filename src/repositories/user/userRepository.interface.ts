import { DeleteResult, UpdateResult } from 'typeorm';
import { IUser } from '../../entity';

export interface IUserRepository {
    getUsers(): Promise<IUser[]>;
    createUser(user: IUser): Promise<IUser>;
    getUserByEmail(email:string): Promise<IUser | undefined>;
    updateUserById(id: number, user:Partial<IUser>): Promise<UpdateResult>;
    softDeleteUserById(id:number):Promise<DeleteResult>;
    getNewUsers(): Promise<IUser[]>;
    // getUserPagination(): Promise<IPaginationResponse<IUser>>
}
