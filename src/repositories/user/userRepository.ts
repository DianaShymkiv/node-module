import {
  DeleteResult,
  EntityRepository,
  getManager,
  Repository,
  UpdateResult,
} from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IUser, UserEntity } from '../../entity';
import { IUserRepository } from './userRepository.interface';
import { IPaginationResponse } from '../../interfaces';

dayjs.extend(utc);

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

  public async updateUserById(id: number, user:Partial<IUser>): Promise<UpdateResult> {
    return getManager()
      .getRepository(UserEntity)
      .update(
        { id },
        user,
      );
  }

  public async softDeleteUserById(id:number):Promise<DeleteResult> {
    return getManager()
      .getRepository(UserEntity)
      .softDelete({ id });
  }

  public async getNewUsers(): Promise<IUser[]> {
    return getManager().getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.createdAt >= :date', { date: dayjs().utc().startOf('day').format() })
      .getMany();
  }

  public async getUserPagination(
    searchObject: Partial<IUser> = {},
    limit: number,
    page: number = 1,
  )
    : Promise<IPaginationResponse<IUser>> {
    const skip = limit * (page - 1);

    const [users, itemCount] = await getManager().getRepository(UserEntity)
      .findAndCount({ where: searchObject, skip, take: limit });

    return {
      page,
      perPage: limit,
      itemCount,
      data: users,
    };
  }
}

export const userRepository = new UserRepository();
