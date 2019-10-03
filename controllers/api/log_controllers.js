const sqlQuery = require("../../models/sql_query");

module.exports = {
    async postController(req, res) { // url: /api/logs
        const { body: { project_id, target, target_id, action_id, log_describe }, user: { user_id } } = req;
        const params = [ project_id, user_id, target, target_id, action_id, log_describe ];
        const [ sqlRes ] = await sqlQuery(`
            insert into tbl_log(project_id, created_by, target, target_id, action_id, log_describe)
            values(?, ?, ?, ?, ?, ?);`, params);
        const statusCode = (sqlRes || sqlRes.insertId === 0) ? 204 : 500;
        res.status(statusCode);
        res.end();
    },
    async getController(req, res) { // url: /api/log

    }
};