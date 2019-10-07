const sqlQuery = require("../../models/sql_query");
const { insertLog, findLogsByUserId, findLogById } = require("../../models/query_str");

module.exports = {
    async postController(req, res) { // url: /api/logs
        const { body: { project_id, target, target_id, action_id, log_describe }, user: { user_id } } = req;
        const params = [ project_id, user_id, target, target_id, action_id, log_describe ];
        let statusCode;
        try {
            const insertLogSql = await sqlQuery(insertLog, params);
            const insertedLogId = [ insertLogSql.insertId ]
            const sqlRes = await sqlQuery(findLogById, insertedLogId);
            statusCode = 201;
            res.status(statusCode).json(sqlRes);
        } catch(err) {
            statusCode = 500;
            res.status(statusCode);
            res.end();
        }
    },
    async getController(req, res) { // url: /api/logs
        const { user_id } = req.user;
        const param = [ user_id ];
        let statusCode;
        try {
            const sqlRes = await sqlQuery(findLogsByUserId, param);
            statusCode = 200;
            res.status(statusCode).json(sqlRes);
        } catch(err) {
            statusCode = 500;
            res.status(statusCode);
            res.end();
        }
    }
};