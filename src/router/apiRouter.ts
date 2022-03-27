import { Router } from 'express';

import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

export const apiRouter = router;
