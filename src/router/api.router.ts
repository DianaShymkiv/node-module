import { Router } from 'express';

import { userRouter } from './user.router';
import { authRouter } from './auth.router';
import { postRouter } from './post.router';
import { commentRouter } from './comment.router';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
// @ts-ignore
router.use('*', (err, req, res, next) => {
    res
        .status(err.code || 500)
        .json({
            message: err.message
        });
});

export const apiRouter = router;
