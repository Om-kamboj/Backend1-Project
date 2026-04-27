export const flashMiddleware = (req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    res.locals.redirectUrl = req.session.redirectUrl;
    next();
};