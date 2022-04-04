import {
    DeleteResult,
    EntityRepository,
    getManager,
    Repository,
    UpdateResult,
} from 'typeorm';
import { IUser, UserEntity } from '../../entity';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> implements IUserRepository {
    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(UserEntity).save(user);
    }

    public async getUserById(id:number):Promise<IUser | undefined> {
        return getManager()
            .getRepository(UserEntity)
            .findOne({ id });
    }

    public async getUserByEmail(email:string): Promise<IUser | undefined> {
        return getManager().getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async getUsers(): Promise<IUser[]> {
        return getManager().getRepository(UserEntity).find();
    }

    public async updateUserById(id: number, password: string): Promise<UpdateResult> {
        return getManager()
            .getRepository(UserEntity)
            .update(
                { id },
                { password },
            );
    }

    public async softDeleteUserById(id:number):Promise<DeleteResult> {
        return getManager()
            .getRepository(UserEntity)
            .softDelete({ id });
    }
}

export const userRepository = new UserRepository();
