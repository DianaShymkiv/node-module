import { UpdateResult } from 'typeorm';

import { IPost } from '../../entity/posts';

export interface IPostRepository {
    getUserPostsByUserId(id: number): Promise<IPost[]>;
    updatePost(id: number, title: string, text: string): Promise<UpdateResult>;
}
