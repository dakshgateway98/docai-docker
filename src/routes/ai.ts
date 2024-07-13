import express from 'express';
import multer from 'multer';
import { AiController } from '../controllers/aiController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const aiController = new AiController();

router.post('/generate-text', upload.array('images'), aiController.generateResponse);


export default router;