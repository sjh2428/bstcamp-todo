const sqlQuery = require("../models/sql_query");

module.exports = {
    indexGetController(req, res) { // url: /
        const flashMsg = req.flash().error;
        res.render('index', { message: flashMsg ? flashMsg : undefined });
    },
    signUpGetController(req, res) { // url: /sign-up

    },
    signUpPostController(req, res) { // url: /sign-up

    },
    todoGetController(req, res) { // url: /todo
        res.render('todo/todo');
    },
    todoIdGetController(req, res) { // url: /todo/:id

    }
};