const sqlQuery = require("../models/sql_query");
const { insertUser } = require("../models/query_str");

module.exports = {
    indexGetController(req, res) { // url: /
        const flashMsg = req.flash().error;
        res.render('index', { message: flashMsg || undefined });
    },
    logoutController(req, res) {
        req.logout();
        req.session.destroy((err) => {
            res.redirect("/");
        });
    },
    signUpGetController(req, res) { // url: /sign-up
        const flashMsg = req.flash('fail_to_sign_up');
        res.render('index/sign_up', { message: flashMsg || undefined });
    },
    async signUpPostController(req, res) { // url: /sign-up
        const { user_id, user_pass, user_name, admin } = req.body;
        const params = [ user_id, user_pass, user_name, admin ];
        try {
            await sqlQuery(insertUser, params);
            res.redirect('/');
        } catch(err) {
            req.flash("fail_to_sign_up", "회원가입에 실패하였습니다!");
            res.redirect('/sign-up');
        }
    },
    todoGetController(req, res) { // url: /todo
        res.render('todo/todo');
    },
    todoIdGetController(req, res) { // url: /todo/:id

    }
};