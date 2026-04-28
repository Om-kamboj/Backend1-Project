import Listing from "../models/listing.model.js";
import Review from "../models/review.model.js";
import ExpressError from "../Middlewares/ExpressError.js";

export const getAllListings = async (req, res) => {
    const search = req.query.search || "";

    const allListings = await Listing.find(
        search ? {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } },
            ]
        } : {}
    );

    res.render("listings/index.ejs", { allListings, search });
}

export const getAllListingsById = async (req, res, next) => {
    let { id } = req.params;
    const showListing = await Listing.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author',
                select: 'firstName lastName username',
            }
        })
        .populate('owner');

    if (!showListing) {
        req.flash("error", "Listing you are looking for does not exist!");
        return res.redirect('/listing');
    }

    req.session.recentlyViewed = req.session.recentlyViewed || [];
    if (!req.session.recentlyViewed.includes(id)) {
        req.session.recentlyViewed.unshift(id);
        req.session.recentlyViewed = req.session.recentlyViewed.slice(0, 5);
    }

    res.render("listings/show.ejs", { showListing });
}

export const postTheListning = async (req, res) => {
    res.render("listings/new.ejs");
}

export const postingNewListing = async (req, res, next) => {
    if (!req.body.listing) {
        return next(new ExpressError(400, "Invalid listing data!"));
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();

    req.flash("success", "New listing created successfully!");
    res.redirect('/listing');
}

export const editTheListing = async (req, res, next) => {
    let { id } = req.params;
    const getListing = await Listing.findById(id);

    if (!getListing) {
        return next(new ExpressError(404, "Listing not found!"));
    }

    res.render('listings/edit.ejs', { getListing });
}

export const putTheChanges = async (req, res, next) => {
    let { id } = req.params;

    if (!req.body.listing) {
        return next(new ExpressError(400, "Invalid listing data!"));
    }

    const updatedListing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true, runValidators: true }
    );

    if (!updatedListing) {
        return next(new ExpressError(404, "Listing not found!"));
    }

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listing/${id}`);
}

export const deleteTheListing = async (req, res, next) => {
    let { id } = req.params;

    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
        return next(new ExpressError(404, "Listing not found!"));
    }

    req.flash("success", "Listing deleted successfully!");
    res.redirect('/listing');
}

export const savingReview = async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "Review added successfully!");
    res.redirect(`/listing/${listing._id}`);
}

export const deletingReview = async (req, res, next) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listing/${id}`);
}