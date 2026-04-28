import Listing from '../models/listing.model.js';
import ExpressError from './ExpressError.js';

const isOwner = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing.owner || !listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listing/${id}`);
    }
    next();
};

export default isOwner;