import { Request, Response } from 'express';

import { IComment } from '../entity';
import { commentService } from '../services';

class CommentController {
  public async getUserComments(req: Request, res: Response): Promise<Response<IComment[]>> {
    const { userId } = req.params;
    const comments = await commentService.getUserComments(userId);
    return res.json(comments);
  }
}

export const commentController = new CommentController();
