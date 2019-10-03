const sqlQuery = require("../models/sql_query");

module.exports = {
    indexGetController(req, res) { // url: /
        res.render('index');
    },
    indexPostController(req, res) { // url: /

    },
    signUpGetController(req, res) { // url: /sign-up

    },
    signUpPostController(req, res) { // url: /sign-up

    },
    todoGetController(req, res) { // url: /todo

    },
    todoIdGetController(req, res) { // url: /todo/:id

    }
};