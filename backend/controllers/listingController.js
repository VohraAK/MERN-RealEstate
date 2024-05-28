import Listing from '../models/listingModel.js'
import { errorHandler } from '../utils/error.js';

export const createListing = async (request, response, next) =>
{
    try 
    {
        const listing = await Listing.create(request.body);
        response.status(201).json(listing);
    } 
    catch (error) { next(error) };
};

export const deleteListing = async (request, response, next) => 
{
    try 
    {
        const listing = await Listing.findById(request.params.id);
        if (!listing) return next(errorHandler(401, "Listing not found!"));
        
        // check if user is authenticated to delete listing
        if (request.user.id !== listing.userRef) return next(errorHandler(401, "You can only delete your own listings!"));

        await Listing.findByIdAndDelete(request.params.id);

        response.status(200).json("Listing has been deleted!");

    } 
    catch (error) { next(error); }
};

export const updateListing = async (request, response, next) => 
{
    try
    {
        const listing = await Listing.findById(request.params.id);
        if (!listing) return next(errorHandler(401, "Listing not found!"));
        
        // check if user is authenticated to update listing
        if (request.user.id !== listing.userRef) return next(errorHandler(401, "You can only update your own listings!"));

        const updatedListing = await Listing.findByIdAndUpdate(request.params.id, request.body, { new: true });
        response.status(200).json(updatedListing);
    }
    catch (error) { next(error) };
};