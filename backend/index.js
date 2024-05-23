import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import listingRouter from './routes/listingRoute.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

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

// app routers
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

//  middleware
app.use((error, request, response, next) => { 
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return response.status(statusCode).json({
        success: false,
        statusCode,
        message
    });

}); 