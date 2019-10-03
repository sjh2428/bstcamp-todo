const sqlQuery = require("../../models/sql_query");

module.exports = {
    async postController(req, res) { // url: /admin/users
        const { user_id, user_pass, user_name, admin } = req.body;
        const params = [ user_id, user_pass, user_name, admin ];
        await sqlQuery(`insert into tbl_user(user_id, user_pass, user_name, admin) values(?, ?, ?, ?);`, params);
        res.redirect("/admin/users");
    },
    async getController(req, res) { // url: /admin/users
        const getUsersData = await sqlQuery(`select user_id, user_pass, user_name, admin from tbl_user;`);
        res.render("/admin/users", { user: req.user, userData: getUsersData });
    },
    async idGetController(req, res) { // url: /admin/users/:id
        const { id } = req.params;
        const param = [ id ];
        const [ userData ] = await sqlQuery(`select user_id, user_pass, user_name, admin from tbl_user
                                                where user_id=?;`, param);
        res.json({ userData });
    },
    async idPutController(req, res) { // url: /admin/users/:id
        const { params: { id }, body: { user_pass, user_name, admin } } = req;
        const params = [ user_pass, user_name, admin, id ];
        const sqlRes = await sqlQuery(`update tbl_user set user_pass=?, user_name=?, admin=? where user_id=?;`, params);
        const statusCode = sqlRes.changedRows ? 200 : 500;
        res.status(statusCode);
        res.end();
    },
    async idDelController(req, res) { // url: /admin/users/:id
        // id에 해당하는 유저의 정보를 삭제해야 하지만
        // 3개월 뒤에 삭제하도록 할 것임
        // 필드를 하나 더 두어서 탈퇴한 날짜를 기록해 둠
        
    }
};