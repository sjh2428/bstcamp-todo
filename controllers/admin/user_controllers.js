const sqlQuery = require("../../models/sql_query");

module.exports = {
    async postController(req, res) { // url: /admin/users
        const { user_id, user_pass, user_name } = req.body;
        await sqlQuery(`insert into tbl_user(user_id, user_pass, user_name)
                                values('${user_id}', '${user_pass}', '${user_name}');`);
        res.redirect("/admin/users");
    },
    getController(req, res) { // url: /admin/users

    },
    idGetController(req, res) { // url: /admin/users/:id

    },
    idPutController(req, res) { // url: /admin/users/:id

    },
    idDelController(req, res) { // url: /admin/users/:id
        
    }
};