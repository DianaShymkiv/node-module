import { IComment } from '../entity/comment';
import { commentRepository } from '../repositories/comment/commentRepository';

class CommentService {
    public async getUserComments(id: string): Promise<IComment[]> {
        return commentRepository.getUserComments(+id);
    }
}

export const commentService = new CommentService();
