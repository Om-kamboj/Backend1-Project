import express from 'express';
import {
    getAllListings,
    getAllListingsById,
    postTheListning,
    postingNewListing,
    editTheListing,
    putTheChanges,
    deleteTheListing,
    savingReview,
    deletingReview,
} from '../Controllers/listing.controller.js';
import wrapAsync from '../Middlewares/wrapAsync.js';
import validateListing from '../Middlewares/validateListing.js';
import validateReview from '../Middlewares/validateReview.js';
import isLoggedIn from '../Middlewares/isLoggedIn.js';

const router = express.Router();

router.get('/', wrapAsync(getAllListings));
router.get('/new', isLoggedIn, wrapAsync(postTheListning));
router.get('/:id', wrapAsync(getAllListingsById));
router.post('/', isLoggedIn, validateListing, wrapAsync(postingNewListing));
router.get('/:id/edit', isLoggedIn, wrapAsync(editTheListing));
router.put('/:id', isLoggedIn, validateListing, wrapAsync(putTheChanges));
router.delete('/:id', isLoggedIn, wrapAsync(deleteTheListing));
router.post('/:id/reviews', isLoggedIn, validateReview, wrapAsync(savingReview));
router.delete('/:id/reviews/:reviewId', isLoggedIn, wrapAsync(deletingReview));

export default router;