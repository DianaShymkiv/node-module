import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware, fileMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', fileMiddleware.checkUserAvatar, authMiddleware.isRegistrationDataValid, authController.registration);
router.post('/login', authMiddleware.isLoginValid, userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

router.post('/forgotPassword', authMiddleware.isEmailValid, userMiddleware.checkIsUserExist, authController.sendForgotPassword);
router.post('/forgotPassword/set', userMiddleware.isChangedPasswordValid, authMiddleware.checkActionToken, authController.setPassword);

export const authRouter = router;
