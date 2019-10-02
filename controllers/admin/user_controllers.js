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
        const { id } = req.params;
        const [ getUserData ] = await sqlQuery(`select user_id, user_pass, user_name, admin from tbl_user
                                                where user_id='${id}';`);
        res.json({ userData: getUserData });
    },
    async idPutController(req, res) { // url: /admin/users/:id
        const { params: { id }, body: {user_pass, user_name } } = req;
        const sqlRes = await sqlQuery(`update tbl_user set user_pass='${user_pass}', user_name='${user_name}'
                            where user_id='${id}';`);
        if (sqlRes.changedRows) {
            res.json({ result: true });
            return;
        }
        res.json({ result: false });
        res.end();
    },
    async idDelController(req, res) { // url: /admin/users/:id
        // id에 해당하는 유저의 정보를 삭제해야 하지만
        // 3개월 뒤에 삭제하도록 할 것임
        // 테이블을 하나 더 두어서 탈퇴한 날짜와 아이디를 넣어두면 될듯
    }
};