const sqlQuery = require("../../models/sql_query");

module.exports = {
    indexGetController(req, res) { // url: /
        res.render('index');
    },
    signInGetController(req, res) { // url: /sign-in

    },
    signUpPostController(req, res) { // url: /sign-up

    },
    todoGetController(req, res) { // url: /todo

    },
    todoIdGetController(req, res) { // url: /todo/:id

    }
};