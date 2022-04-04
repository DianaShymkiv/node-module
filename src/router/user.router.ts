import { Router } from 'express';

import { userController } from '../controller';
import { userMiddleware } from '../middlewares';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:email', userController.getUserByEmail);
router.patch('/:id', userMiddleware.isChangedPasswordValid, userMiddleware.getEmailByUserId, userController.updateUserPasswordById);
router.delete('/:id', userController.softDeleteUserById);

export const userRouter = router;
