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
    async idGetController(req, res) { // url: /admin/users/:id

    },
    async idPutController(req, res) { // url: /admin/users/:id

    },
    async idDelController(req, res) { // url: /admin/users/:id
        // id에 해당하는 유저의 정보를 삭제해야 하지만
        // 3개월 뒤에 삭제하도록 할 것임
        // 테이블을 하나 더 두어서 탈퇴한 날짜와 아이디를 넣어두면 될듯
    }
};