const sqlQuery = require("../../models/sql_query");
const { insertUserWithAdmin, findUserAll,
    findUserById, updateUserById, setExitDateOfUser } = require("../../models/query_str");

module.exports = {
    async postController(req, res) { // url: /admin/users
        const { user_id, user_pass, user_name, admin } = req.body;
        const params = [ user_id, user_pass, user_name, admin ];
        try {
            await sqlQuery(insertUserWithAdmin, params);
        } catch(err) {
            req.flash("fail_to_post_user", "유저를 등록하는데에 실패하였습니다!");
        } finally {
            res.redirect("/admin/users");
        }
    },
    async getController(req, res) { // url: /admin/users
        let userData;
        const message = req.flash("fail_to_post_user") || undefined;
        try {
            userData = await sqlQuery(findUserAll);
        } catch(err) {
            userData = [undefined];
        } finally {
            res.render("/admin/users", { user: req.user, userData, message });
        }
    },
    async idGetController(req, res) { // url: /admin/users/:id
        const { id } = req.params;
        const param = [ id ];
        let statusCode;
        try {
            const userData = await sqlQuery(findUserById, param);
            statusCode = 200;
            res.status(statusCode).json(userData);
        } catch(err) {
            statusCode = 500;
            res.status(statusCode);
            res.end();
        }
    },
    async idPutController(req, res) { // url: /admin/users/:id
        const { params: { id }, body: { user_pass, user_name, admin } } = req;
        const params = [ user_pass, user_name, admin, id ];
        let statusCode;
        try {
            await sqlQuery(updateUserById, params);
            statusCode = 204;
        } catch(err) {
            statusCode = 500;
        } finally {
            res.status(statusCode);
            res.end();
        }
    },
    async idDelController(req, res) { // url: /admin/users/:id
        // id에 해당하는 유저의 정보를 삭제해야 하지만
        // 3개월 뒤에 삭제하도록 할 것임
        // 필드를 하나 더 두어서 탈퇴한 날짜를 기록해 둠
        const { id } = req.params;
        const param = [ id ];
        let statusCode;
        try {
            await sqlQuery(setExitDateOfUser, param);
            statusCode = 204;
        } catch(err) {
            statusCode = 500;
        } finally {
            res.status(statusCode);
            res.end();
        }
    }
};