import express from 'express';
import { googleLogin, signin, signup, signout } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.get('/signout', signout);
authRouter.post('/google', googleLogin);

export default authRouter;