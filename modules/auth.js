const sqlQuery = require("../models/sql_query");

module.exports = {
    onlyPublic(req, res, next) {
        if (req.user) res.redirect("/todo");
        else next();
    },
    onlyPrivate(req, res, next) {
        if (req.user) next();
        else res.redirect("/");
    },
    onlyAdmin(req, res, next) {
        if (req.user && req.user.admin) next();
        else res.redirect("/");
    },
    async doYouHaveRAuth(req, res, next) {
        const { user_id } = req.user;
        const { project_id } = req.body || req.query;
        const params = [ user_id, project_id ];
        const [ sqlRes ] = await sqlQuery(`select authority from tbl_auth where user_id=? and project_id=?`, params);
        if (sqlRes.authority) next();
        else {
            res.status(401);
            res.end();
        }
    },
    async doYouHaveRWAuth(req, res, next) {
        const { user_id } = req.user;
        const { project_id } = req.body || req.query;
        const params = [ user_id, project_id ];
        const [ sqlRes ] = await sqlQuery(`select authority from tbl_auth where user_id=? and project_id=?`, params);
        if (sqlRes.authority === 2) next();
        else {
            res.status(401);
            res.end();
        }
    }
};