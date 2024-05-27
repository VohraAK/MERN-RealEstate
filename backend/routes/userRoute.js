import express from 'express';
import { test, updateUser, deleteUser, getUserListings } from '../controllers/userController.js';
import { verifyUser } from '../utils/verifyUser.js'

const userRouter = express.Router();

userRouter.get('/test', test);
userRouter.post('/update/:id', verifyUser, updateUser);
userRouter.delete('/delete/:id', verifyUser, deleteUser);
userRouter.get('/listings/:id', verifyUser, getUserListings);

export default userRouter;