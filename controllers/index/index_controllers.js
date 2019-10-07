module.exports = {
    indexGetController(req, res) { // url: /
        const flashMsg = req.flash().error;
        res.render('index', { message: flashMsg || undefined });
    },
    logoutController(req, res) {
        req.logout();
        req.session.destroy((err) => {
            res.redirect("/");
        });
    }
};