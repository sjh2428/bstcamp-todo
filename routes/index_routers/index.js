const passport = require("passport");
const express = require('express');
const router = express.Router();
const signupRouter = require('./signup');
const projectRouter = require('./project');
const { onlyPublic, onlyPrivate } = require('../../middleware/auth');
const { indexGetController, logoutController } = require("../../controllers/index/index_controllers");

// url: /
router.get('/', onlyPublic, indexGetController);
router.post('/', passport.authenticate("local", {
    successRedirect: "/project",
    failureRedirect: "/",
    failureFlash: true
}));
router.get('/logout', logoutController);
router.get('/auth/github', passport.authenticate('github', { scope: ['user:login', 'user:name'] }));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    return res.redirect('/');
});
router.use('/sign-up', onlyPublic, signupRouter);
router.use('/project', onlyPrivate, projectRouter);

module.exports = router;