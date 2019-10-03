module.exports = {
    onlyPublic(req, res, next) {
        if (req.user) res.redirect("/");
        else next();
    },
    onlyPrivate(req, res, next) {
        if (req.user) next();
        else res.redirect("/");
    },
    onlyAdmin(req, res, next) {
        if (req.user && req.user.admin) next();
        else res.redirect("/");
    }
};