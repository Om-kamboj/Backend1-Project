import { userSchema } from '../schema.js';

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", ");
        req.flash("error", errMsg);
        return res.redirect('/register');
    } else {
        next();
    }
};

export default validateUser;