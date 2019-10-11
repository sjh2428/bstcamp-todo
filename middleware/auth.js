const sqlQuery = require("../models/sql_query");
const { findAuthByUserIdProjectId, findProjectById } = require("../models/query_str");

module.exports = {
    onlyPublic(req, res, next) {
        if (req.user) res.redirect("/project");
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
    async isItYours(req, res, next) {
        const { user_id } = req.user;
        const { project_id } = req.body || req.query;
        const param = [ project_id ];
        const [ sqlRes ] = await sqlQuery(findProjectById, param);
        if (sqlRes.created_by === user_id) next();
        else {
            res.status(401);
            res.end();
        }
    },
    async doYouHaveRAuth(req, res, next) {
        const { user_id } = req.user;
        const { project_id } = req.query;
        const params = [ user_id, project_id ];
        const [ sqlRes ] = await sqlQuery(findAuthByUserIdProjectId, params);
        if (sqlRes.authority) next();
        else {
            res.status(403);
            res.end();
        }
    },
    async doYouHaveRWAuth(req, res, next) {
        const { user_id } = req.user;
        const { project_id } = req.query;
        const params = [ user_id, project_id ];
        const [ sqlRes ] = await sqlQuery(findAuthByUserIdProjectId, params);
        if (sqlRes.authority === 2) next();
        else {
            res.status(403);
            res.end();
        }
    }
};