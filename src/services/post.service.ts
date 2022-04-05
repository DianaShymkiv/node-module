import { UpdateResult } from 'typeorm';

import { postRepository } from '../repositories';
import { IPost } from '../entity';

class PostService {
  public async getUserPostsByUserId(userId : string): Promise<IPost[]> {
    return postRepository.getUserPostsByUserId(+userId);
  }

  public async updatePost(id: string, title: string, text: string): Promise<UpdateResult> {
    return postRepository.updatePost(+id, title, text);
  }
}

export const postService = new PostService();
