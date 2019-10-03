const passport = require("passport");
const express = require('express');
const router = express.Router();
const { onlyPublic, onlyPrivate } = require('../modules/auth');
const { indexGetController, signUpGetController, signUpPostController,
    todoGetController, todoIdGetController } = require("../controllers/index_controllers");

// url: /

router.get('/', onlyPublic, indexGetController);
router.post('/', passport.authenticate("local", {
    successRedirect: "/todo",
    failureRedirect: "/",
    failureFlash: true
}));
router.get('/sign-up', onlyPublic, signUpGetController);
router.post('/sign-up', onlyPublic, signUpPostController);
router.get('/todo', onlyPrivate, todoGetController);
router.get('/todo/:id', onlyPrivate, todoIdGetController);

module.exports = router;