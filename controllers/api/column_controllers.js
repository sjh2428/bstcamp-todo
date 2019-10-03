const sqlQuery = require("../../models/sql_query");
const { insertColumn, findColumnsByProjectId, findColumnById,
    updateColumnById, deleteColumnById } = require("../../models/query_str");

module.exports = {
    async postController(req, res) { // url: /api/columns
        const { body: { column_name, column_max_idx, project_id }, user: { user_id } } = req;
        const params = [ column_name, column_max_idx + 1, project_id, user_id ];
        const [ sqlRes ] = await sqlQuery(insertColumn, params);
        const statusCode = (sqlRes || sqlRes.insertId) === 0 ? 204 : 500;
        res.status(statusCode);
        res.end();
    },
    async getController(req, res) { // url: /api/columns
        const { project_id } = req.body;
        const param = [ project_id ];
        const [ sqlRes ] = await sqlQuery(findColumnsByProjectId, param);
        const statusCode = sqlRes ? 200 : 500;
        if (statusCode === 200) res.json(sqlRes);
        res.status(statusCode);
        res.end();
    },
    async idGetController(req, res) { // url: /api/columns/:id
        const { id } = req.params;
        const param = [ id ];
        const [ sqlRes ] = await sqlQuery(findColumnById, param);
        const statusCode = sqlRes ? 200 : 500;
        if (statusCode === 200) res.json(sqlRes);
        res.status(statusCode);
        res.end();
    },
    async idPutController(req, res) { // url: /api/columns/:id
        const { body: { column_name, column_idx }, params: { id } } = req;
        const params = [ column_name, column_idx, id ];
        const [ sqlRes ] = await sqlQuery(updateColumnById, params);
        const statusCode = (sqlRes && sqlRes.changedRows) ? 204 : 500;
        res.status(statusCode);
        res.end();
    },
    async idDelController(req, res) { // url: /api/columns/:id
        const { id } = req.params;
        const param = [ id ];
        const [ sqlRes ] = await sqlQuery(deleteColumnById, param);
        const statusCode = (sqlRes && sqlRes.affectedRows) ? 204 : 500;
        res.status(statusCode);
        res.end();
    }
};