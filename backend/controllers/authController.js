import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (request, response, next) => {
    const {username, email, password} = request.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try 
    {
        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        response.status(201).json("User created sucessfully!");
    } 
    catch (error) { next(error); }
};

export const signin = async (request, response, next) => {
    const {username, password} = request.body;
    try 
    {
       // check if username exists
       const validUser = await User.findOne({ username });

       // invalid username calls errorHandler middleware
       if (!validUser) return next(errorHandler(404, 'User not found!'));

       // compare hashed password with validUser password
       const validPassword = bcryptjs.compareSync(password, validUser.password);

       // invalid password calls errorHandler middleware
       if (!validPassword) return next(errorHandler(401, 'Invalid credentials!'));

       // create web token for user session
       const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

       // destructure password from validUser._doc
       const {password: pass, ...user} = validUser._doc;

       // save token as cookie (12 hour expiry)
       response.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 60*60*12) }).status(200).json(user);
    } 
    catch (error) { next(error); }
};