import { getManager, Repository } from 'typeorm';

import { ICommentRepository } from './commentRepository.interface';
import { Comment, IComment } from '../../entity';

class CommentRepository extends Repository<Comment> implements ICommentRepository {
    public async getUserComments(userId: number): Promise<IComment[]> {
        return getManager().getRepository(Comment)
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .where('comment.authorId = user.id', { userId })
            .getMany();
    }
}

export const commentRepository = new CommentRepository();
