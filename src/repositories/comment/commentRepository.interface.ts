import { IComment } from '../../entity';

export interface ICommentRepository {
    getUserComments(id: number): Promise<IComment[]>;
}
