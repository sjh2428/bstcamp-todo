const express = require('express');
const router = express.Router();
const usersRouter = require("./users");

// url: /admin

router.get('/', (req, res) => {
    res.render('admin/admin', {user: req.user});
});

router.use("/users", usersRouter);

module.exports = router;