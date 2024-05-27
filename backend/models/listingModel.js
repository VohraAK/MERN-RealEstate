import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        address: { type: String, required: true },
        regularPrice: { type: Number, required: true },
        discountedPrice: { type: Number, required: true },
        bedroomCount: { type: Number, required: true },
        bathroomCount: { type: Number, required: true },
        furnished: { type: Boolean, required: true },
        parking: { type: Boolean, required: true },
        type: { type: String, required: true },  //  for rent or for sale
        offer: { type: Boolean, required: true },
        imageURLs: { type: Array, required: true },
        userRef: { type: String, required: true }
    }, { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;