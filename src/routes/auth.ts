import express from 'express';
import passport from "passport";

import {AuthController} from '../controllers/authController';
import { googleLogin, googleLoginCallback} from '../middlewares/google-auth';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/google-login', googleLogin);
router.get('/google/callback', googleLoginCallback, authController.handleGoogleLoginCallback);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export default router;