import Joi from 'joi';

export const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).max(1000000).required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image: Joi.object({
            filename: Joi.string(),
            url: Joi.string().allow("", null),
        })
    }).required()
});

export const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().min(10).max(500).required(),
    }).required()
});

export const userSchema = Joi.object({
    user: Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().min(3).max(30).required(),
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        password: Joi.string().min(6).max(100).required(),
    }).required()
});