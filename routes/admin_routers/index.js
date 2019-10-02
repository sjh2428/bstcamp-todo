const express = require('express');
const router = express.Router();
const usersRouter = require("./users");

// url: /admin

router.get('/', (req, res) => {
    console.log('this is admin get router');
    res.redirect('/');
});

router.use("/users", usersRouter);

module.exports = router;