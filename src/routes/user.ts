import express from 'express';
import multer from 'multer';
import { UserController } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/jwtMiddleware';

const router = express.Router();

const userController = new UserController();

router.get('/profile', authenticateJWT, userController.userProfile);


export default router;