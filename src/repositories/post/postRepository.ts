import {
  EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IPost, Post } from '../../entity';
import { IPostRepository } from './postRepository.interface';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
  public async getUserPostsByUserId(userId:number): Promise<IPost[]> {
    return getManager()
      .getRepository(Post)
      .createQueryBuilder('post')
      .leftJoin('User', 'user', 'user.id = post.userId')
      .where('post.userId = user.id', { userId })
      .getMany();
  }

  public async updatePost(id: number, title: string, text: string): Promise<UpdateResult> {
    return getManager()
      .getRepository(Post)
      .update({ id }, { title, text });
  }
}

export const postRepository = new PostRepository();
