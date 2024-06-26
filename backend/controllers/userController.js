import User from "../models/userModel.js";
import Listing from "../models/listingModel.js"
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'; 

export const test = (request, response) => { response.json({"message": "Hello World!"}); }

export const updateUser = async (request, response, next) => {
    if (request.user.id != request.params.id) return next(errorHandler(401, 'You can only update your own account!'));

    try 
    {
        // hash new password if it exixts
        if (request.body.password)
        {
            request.body.password = bcryptjs.hashSync(request.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(request.params.id, {
            $set : {
                username: request.body.username,
                email: request.body.email,
                password: request.body.password,
                avatar: request.body.avatar,
            }
        }, {new: true}) //  sets updated fields into a new user and updates it in db
        
        const {password: pass, ...rest} = updatedUser._doc
        response.status(200).json(rest);
    }
        
    catch (error) 
    {
        next(error);
    }

};

export const deleteUser = async (request, response, next) => {
    if (request.user.id != request.params.id) return next(errorHandler(401, 'You can only delete your own account!'));

    try 
    {
        await User.findByIdAndDelete(request.params.id);

        //clear cookie before sending json
        response.clearCookie('access_token');
        response.status(200).json("User has been deleted!")
    } 
    catch (error) 
    {
        next(error);
    }

};

export const getUserListings = async (request, response, next) => {
    if (request.user.id != request.params.id) return next(errorHandler(401, 'You can only view your own listings!'));

    try 
    {
        const listings = await Listing.find({ userRef: request.params.id });
        response.status(200).json(listings);
    } 
    catch (error) { next(error); }
};

export const getUser = async (request, response, next) => {

    try 
    {
        const user = await User.findById(request.params.id)  ;
        if (!user) return next(errorHandler(404, "User not found!"));

        // seperate password from user object
        const { password: pass, ...rest } = user._doc;

        response.status(200).json(rest);

    } 
    catch (error) 
    {
        next(error);
    }
};