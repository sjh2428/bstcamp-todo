const sqlQuery = require("../../models/sql_query");
const { insertLog, findLogsByUserId } = require("../../models/query_str");

module.exports = {
    async postController(req, res) { // url: /api/logs
        const { body: { project_id, target, target_id, action_id, log_describe }, user: { user_id } } = req;
        const params = [ project_id, user_id, target, target_id, action_id, log_describe ];
        const [ sqlRes ] = await sqlQuery(insertLog, params);
        const statusCode = (sqlRes || sqlRes.insertId === 0) ? 204 : 500;
        res.status(statusCode);
        res.end();
    },
    async getController(req, res) { // url: /api/logs
        const { user_id } = req.user;
        const param = [ user_id ];
        const [ sqlRes ] = await sqlQuery(findLogsByUserId, param);
        const statusCode = sqlRes ? 200 : 500;
        if (statusCode === 200) res.json(sqlRes);
        res.status(statusCode);
        res.end();
    }
};