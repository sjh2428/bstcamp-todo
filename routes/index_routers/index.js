const passport = require("passport");
const express = require('express');
const router = express.Router();
const signupRouter = require('./signup');
const todoRouter = require('./todo');
const { onlyPublic, onlyPrivate } = require('../../modules/auth');
const { indexGetController } = require("../../controllers/index_controllers");

// url: /
router.get('/', onlyPublic, indexGetController);
router.post('/', passport.authenticate("local", {
    successRedirect: "/todo",
    failureRedirect: "/",
    failureFlash: true
}));
router.get('/auth/github', passport.authenticate('github', { scope: ['user:login', 'user:name'] }));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    return res.redirect('/');
});
router.use('/sign-up', onlyPublic, signupRouter);
router.use('/todo', onlyPrivate, todoRouter);

module.exports = router;