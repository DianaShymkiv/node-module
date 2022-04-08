import { Router } from 'express';

import { userController } from '../controller';
import { userMiddleware } from '../middlewares';

const router = Router();

// router.get('/', userController.getUsers);
router.get('/', userController.getUserPagination);
router.get('/:email', userController.getUserByEmail);
router.patch('/:id', userMiddleware.isChangedPasswordValid, userMiddleware.getEmailByUserId, userController.updateUserById);
router.delete('/:id', userController.softDeleteUserById);

export const userRouter = router;
