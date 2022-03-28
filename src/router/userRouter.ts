import { Router } from 'express';

import { userController } from '../controller';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:email', userController.getUserByEmail);
router.patch('/:id', userController.updateUserById);
router.delete('/:id', userController.softDeleteUserById);

export const userRouter = router;
