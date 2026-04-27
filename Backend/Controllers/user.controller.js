import User from '../models/user.model.js';
import passport from 'passport';

export const getRegisterForm = async (req, res) => {
    res.render('users/register.ejs');
};

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, firstName, lastName, password } = req.body.user;

        const newUser = new User({ username, email, firstName, lastName });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome to Hotspot, ${registeredUser.firstName}!`);
            const redirectUrl = res.locals.redirectUrl || '/listing';
            delete req.session.redirectUrl;
            res.redirect(redirectUrl);
        });

    } catch (err) {
        req.flash("error", err.message);
        res.redirect('/register');
    }
};

export const getLoginForm = async (req, res) => {
    res.render('users/login.ejs');
};

export const loginUser = async (req, res) => {
    req.flash("success", `Welcome back, ${req.user.firstName}!`);
    const redirectUrl = res.locals.redirectUrl || '/listing';
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
};

export const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "Logged out successfully!");
        res.redirect('/listing');
    });
};