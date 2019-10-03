const sqlQuery = require("../../models/sql_query");

module.exports = {
    async postController(req, res) { // url: /api/columns
        const { body: { column_name, column_max_idx, project_id }, user: { user_id } } = req;
        const params = [ column_name, column_max_idx + 1, project_id, user_id ];
        const [ sqlRes ] = await sqlQuery(`insert into tbl_column(column_name, column_idx, project_id, created_by)
            values(?, ?, ?, ?);`, params);
        const statusCode = sqlRes.insertId === 0 ? 204 : 500;
        res.status(statusCode);
        res.end();
    },
    async getController(req, res) { // url: /api/columns

    },
    async idGetController(req, res) { // url: /api/columns/:id

    },
    async idPutController(req, res) { // url: /api/columns/:id

    },
    async idDelController(req, res) { // url: /api/columns/:id
        
    }
};