const sqlQuery = require("../../models/sql_query");

module.exports = {
    async postController(req, res) { // url: /admin/users
        const { user_id, user_pass, user_name } = req.body;
        await sqlQuery(`insert into tbl_user(user_id, user_pass, user_name)
                                values('${user_id}', '${user_pass}', '${user_name}');`);
        res.redirect("/admin/users", {user: req.user});
    },
    async getController(req, res) { // url: /admin/users
        const getUsersData = await sqlQuery(`select user_id, user_pass, user_name, admin from tbl_user;`);
        res.render("/admin/users", {user: req.user, userData: getUsersData});
    },
    idGetController(req, res) { // url: /admin/users/:id

    },
    idPutController(req, res) { // url: /admin/users/:id

    },
    idDelController(req, res) { // url: /admin/users/:id
        
    }
};