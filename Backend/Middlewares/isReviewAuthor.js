import Review from '../models/review.model.js';

const isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review.author || !review.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listing/${id}`);
    }
    next();
};

export default isReviewAuthor;