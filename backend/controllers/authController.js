import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import { response } from "express";

export const signup = async (request, response, next) => {
    const {username, email, password} = request.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try 
    {
        const newUser = new User({
            username, 
            email, 
            password: hashedPassword
        });

        await newUser.save();
        response.status(201).json("User created sucessfully!");
    } 
    catch (error) { next(error); }
};

export const signin = async (request, response, next) => {

    const {username, password} = request.body;
    console.log(username, password);
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
       response.cookie('access_token', token, { httpOnly: true }).status(200).json(user);
    } 
    catch (error) { next(error); }
};

export const googleLogin = async (request, response, next) => {

    const {username, email, photo} = request.body;
    try 
    {
        // fetch user from DB (check through email)
        const validUser = await User.findOne({ email });
        // check if user exists
        if (validUser != null)
        {
            // create a new user session
            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...user } = validUser._doc;
            response.cookie('access_token', token, { httpOnly: true })
                    .status(200)
                    .json(user);
        }

        else
        {
            
            // create a unique username
            // const newUsername = username.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);
            // console.log(`Username: ${newUsername}`);

            // create a random strong password
            const pwd = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            // hash created password
            const hashedPassword = bcryptjs.hashSync(pwd, 10);

            // create a new user
            const newUser = new User({
                username: username.split(" ").join("").toLowerCase() + Math.random().toString(32).slice(-4),
                email,
                password: hashedPassword,
                avatar: photo
            });

            // save new user
            await newUser.save();

            // create a new user session
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...user } = newUser._doc;
            response.cookie('access_token', token, { httpOnly: true })
                    .status(200)
                    .json(user);

        }
    }
    catch (error) { next(error); }
};

export const signout = async (request, response, next) => {
    try 
    {
        response.clearCookie('access_token');
        response.status(200).json("User has been signed out...")
    } 
    catch (error) { next(error) }
};