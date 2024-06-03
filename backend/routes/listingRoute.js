import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings} from '../controllers/listingController.js';
import { verifyUser } from "../utils/verifyUser.js"

const listingRouter = express.Router();

listingRouter.post('/create', verifyUser, createListing);
listingRouter.delete('/delete/:id', verifyUser, deleteListing);
listingRouter.post('/update/:id', verifyUser, updateListing);
listingRouter.get('/get/:id', getListing);
listingRouter.get('/get', getListings);

export default listingRouter;