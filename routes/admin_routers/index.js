const express = require('express');
const router = express.Router();
const usersRouter = require("./users");
const { onlyAdmin } = require("../../modules/auth");

// url: /admin

router.get('/', onlyAdmin, (req, res) => {
    res.render('admin/admin', {user: req.user});
});

router.use("/users", onlyAdmin, usersRouter);

module.exports = router;