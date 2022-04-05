import { IComment } from '../entity';
import { commentRepository } from '../repositories';

class CommentService {
  public async getUserComments(id: string): Promise<IComment[]> {
    return commentRepository.getUserComments(+id);
  }
}

export const commentService = new CommentService();
