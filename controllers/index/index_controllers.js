module.exports = {
    indexGetController(req, res) { // url: /
        const message = req.flash().error || undefined;
        res.render('index', { message });
    },
    logoutController(req, res) {
        req.logout();
        req.session.destroy((err) => {
            res.redirect("/");
        });
    }
};