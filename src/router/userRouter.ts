import { Router } from 'express';

import { userController } from '../controller';
import { userMiddleware } from '../middlewares';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', userMiddleware.validator, userController.createUser);
router.get('/:email', userController.getUserByEmail);
router.patch('/:id', userMiddleware.idValidator, userController.updateUserById);
router.delete('/:id', userMiddleware.idValidator, userController.softDeleteUserById);

export const userRouter = router;
