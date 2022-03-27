import { IComment } from '../../entity/comment';

export interface ICommentRepository {
    getUserComments(id: number): Promise<IComment[]>;
}
