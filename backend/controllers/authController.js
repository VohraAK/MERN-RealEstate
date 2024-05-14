import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (request, response, next) => {
    const {username, email, password} = request.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try 
    {
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        response.status(201).json("User created sucessfully!");
    } 
    catch (error) 
    {
       next(error);
    }
};