import express from 'express';
import {
    getRegisterForm,
    registerUser,
    getLoginForm,
    loginUser,
    logoutUser,
} from '../Controllers/user.controller.js';
import wrapAsync from '../Middlewares/wrapAsync.js';
import validateUser from '../Middlewares/validateUser.js';
import passport from 'passport';

const router = express.Router();

router.get('/register', wrapAsync(getRegisterForm));
router.post('/register', validateUser, wrapAsync(registerUser));

router.get('/login', wrapAsync(getLoginForm));
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
}), wrapAsync(loginUser));

router.get('/logout', logoutUser);

export default router;