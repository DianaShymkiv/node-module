import { Router } from 'express';

import { commentController } from '../controller/commentController';

const router = Router();

router.get('/:userId', commentController.getUserComments);

export const commentRouter = router;
