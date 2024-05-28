import express from 'express';
import { createListing, deleteListing } from '../controllers/listingController.js';
import { verifyUser } from "../utils/verifyUser.js"

const listingRouter = express.Router();

listingRouter.post('/create', verifyUser, createListing);
listingRouter.delete('/delete/:id', verifyUser, deleteListing)

export default listingRouter;