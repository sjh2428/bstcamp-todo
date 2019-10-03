const passport = require("passport");
const express = require('express');
const router = express.Router();
const { indexGetController, signUpGetController, signUpPostController,
    todoGetController, todoIdGetController } = require("../controllers/index_controllers");

// url: /

/* GET home page. */
router.get('/', indexGetController);
router.post('/', passport.authenticate("local", {
    successRedirect: "/todo",
    failureRedirect: "/",
    failureFlash: true
}));
router.get('/sign-up', signUpGetController);
router.post('/sign-up', signUpPostController);
router.get('/todo', todoGetController);
router.get('/todo/:id', todoIdGetController);

module.exports = router;