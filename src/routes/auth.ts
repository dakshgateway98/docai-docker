import express from 'express';
import passport from "passport";

import {AuthController} from '../controllers/authController';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/google-login', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', authController.googleLoginCallback, authController.handleGoogleLoginCallback);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export default router;