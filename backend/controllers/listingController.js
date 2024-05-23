import Listing from '../models/listingModel.js'

export const createListing = async (request, response, next) =>
{
    try 
    {
        const listing = await Listing.create(request.body);
        response.status(201).json(listing);
    } 
    catch (error) { next(error) };
};