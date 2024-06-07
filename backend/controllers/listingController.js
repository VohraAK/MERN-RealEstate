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

export const getListing = async (request, response, next) => 
{
    try
    {
        const listing = await Listing.findById(request.params.id);
        if (!listing) return next(errorHandler(401, "Listing not found!"));
        response.status(200).json(listing);
    }
    catch (error) { next(error) };
};

export const getListings = async (request, response, next) => {
    
    try 
    {
        // add a limit from query for showing results, show by default 9 listings
        const limit = parseInt(request.query.limit) || 9;

        // add a start index from query for showing results, default 0
        const startIndex = parseInt(request.query.startIndex) || 0;

        // get offer from query
        let offer = request.query.offer;
       
        if (offer === undefined || offer === 'false')
        {
            // set offer to object which filters result from db [all listings of every offer type are displayed initially; when user filters by offer, only then correctg listings are displayed]
            offer = { $in: [false, true] };
        };

        let furnished = request.query.furnished;
       
        if (furnished === undefined || furnished === 'false')
        {
            furnished = { $in: [false, true] };
        };

        let parking = request.query.parking;
       
        if (parking === undefined || parking === 'false')
        {
            parking = { $in: [false, true] };
        };

        let type = request.query.type;

        if (type === undefined || type === 'all')
        {
            type = { $in: ['rent', 'sell'] };
        };

        const searchTerm = request.query.searchTerm || '';

        // default sort by latest listing
        const sort = request.query.sort || 'createdAt';

        const order = request.query.order || 'desc';

        const listings = await Listing.find(
            {
                // search name, any case
                name: { $regex: searchTerm, $options: "i" },
                offer,
                furnished,
                parking,
                type,
            // sort (by default: createdAt descending)
            })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return response.status(200).json(listings);
        
    } 
    catch (error) { next(error); }
};