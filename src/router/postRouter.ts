import { Router } from 'express';

import { postController } from '../controller/postController';

const router = Router();

router.get('/:userId', postController.getUserPostsByUserId);
router.patch('/:id', postController.updatePost);

export const postRouter = router;
