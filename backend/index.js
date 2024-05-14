import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
});

const connectDB = async () => {
    try 
    {
        await mongoose.connect(`${process.env.MONGO}`)
        console.log("Connected to Database!")
    } 
    catch (error) 
    {
        console.log(error)
    }
};

connectDB();

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);