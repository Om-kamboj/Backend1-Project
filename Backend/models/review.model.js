import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: [true, "Comment is required"],
        trim: true,
        minLength: [10, "Comment must be at least 10 characters"],
        maxLength: [500, "Comment must not exceed 500 characters"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
    },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;