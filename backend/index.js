import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

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