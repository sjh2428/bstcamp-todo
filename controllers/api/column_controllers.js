const sqlQuery = require("../../models/sql_query");
const { insertColumn, findColumnsByProjectId, findColumnById,
    updateColumnById, deleteColumnById } = require("../../models/query_str");

module.exports = {
    async postController(req, res) { // url: /api/columns
        const { body: { column_name, column_max_idx, project_id }, user: { user_id } } = req;
        const params = [ column_name, column_max_idx + 1, project_id, user_id ];
        let statusCode;
        try {
            const insertCol = await sqlQuery(insertColumn, params);
            const param = [ insertCol.insertId ];
            const sqlRes = await sqlQuery(findColumnById, param);
            statusCode = 201;
            res.status(statusCode).json(sqlRes);
        } catch(err) {
            statusCode = 500;
            res.status(statusCode);
            res.end();
        }
    },
    async getController(req, res) { // url: /api/columns
        const { project_id } = req.body;
        const param = [ project_id ];
        let statusCode;
        try {
            const sqlRes = await sqlQuery(findColumnsByProjectId, param);
            statusCode = 200;
            res.status(statusCode).json(sqlRes);
        } catch(err) {
            statusCode = 500;
            res.status(statusCode);
            res.end();
        }
    },
    async idGetController(req, res) { // url: /api/columns/:id
        const { id } = req.params;
        const param = [ id ];
        let statusCode;
        try {
            const sqlRes = await sqlQuery(findColumnById, param);
            statusCode = 200;
            res.status(statusCode).json(sqlRes);
        } catch(err) {
            statusCode = 500;
            res.status(statusCode);
            res.end();
        }
    },
    async idPutController(req, res) { // url: /api/columns/:id
        const { body: { column_name, column_idx }, params: { id } } = req;
        const params = [ column_name, column_idx, id ];
        let statusCode;
        try {
            await sqlQuery(updateColumnById, params);
            statusCode = 204;
        } catch(err) {
            statusCode = 500;
        } finally {
            res.status(statusCode);
            res.end();
        }
    },
    async idDelController(req, res) { // url: /api/columns/:id
        const { id } = req.params;
        const param = [ id ];
        let statusCode;
        try {
            await sqlQuery(deleteColumnById, param);
            statusCode = 204;
        } catch(err) {
            statusCode = 500;
        } finally {
            res.status(statusCode);
            res.end();
        };
    }
};