import express from 'express';
import { createListing } from '../controllers/listingController.js';
import { verifyUser } from "../utils/verifyUser.js"

const listingRouter = express.Router();

listingRouter.post('/create', verifyUser, createListing);

export default listingRouter;