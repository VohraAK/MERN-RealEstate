import express from 'express';
import { emailTest, googleLogin, signin, signup } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/google', googleLogin);
authRouter.post('/test', emailTest);

export default authRouter;