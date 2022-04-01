import { Router } from 'express';

import { commentController } from '../controller';

const router = Router();

router.get('/:userId', commentController.getUserComments);

export const commentRouter = router;
