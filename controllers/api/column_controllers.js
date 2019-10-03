const sqlQuery = require("../../models/sql_query");

module.exports = {
    async postController(req, res) { // url: /api/columns
        const { body: { column_name, column_max_idx, project_id }, user: { user_id } } = req;
        const params = [ column_name, column_max_idx + 1, project_id, user_id ];
        const [ sqlRes ] = await sqlQuery(`insert into tbl_columns(column_name, column_idx, project_id, created_by)
            values(?, ?, ?, ?);`, params);
        const statusCode = (sqlRes && sqlRes.insertId) === 0 ? 204 : 500;
        res.status(statusCode);
        res.end();
    },
    async getController(req, res) { // url: /api/columns
        const { project_id } = req.body;
        const param = [ project_id ];
        const [ sqlRes ] = await sqlQuery(`select column_id, column_name, column_idx, project_id, created_by
            from tbl_columns where project_id=? order by column_idx asc;`, param);
        const statusCode = sqlRes ? 200 : 500;
        if (statusCode === 200) res.json(sqlRes);
        res.status(statusCode);
        res.end();
    },
    async idGetController(req, res) { // url: /api/columns/:id
        const { id } = req.params;
        const param = [ id ];
        const [ sqlRes ] = await sqlQuery(`select column_id, column_name, column_idx, project_id, created_by
            from tbl_columns where column_id=?`, param);
        const statusCode = sqlRes ? 200 : 500;
        if (statusCode === 200) res.json(sqlRes);
        res.status(statusCode);
        res.end();
    },
    async idPutController(req, res) { // url: /api/columns/:id
        const { body: { column_name, column_idx }, params: { id } } = req;
        const params = [ column_name, column_idx, id ];
        const [ sqlRes ] = await sqlQuery(`update tbl_columns set column_name=?, column_idx=? 
            where column_id=?`, params);
        const statusCode = (sqlRes && sqlRes.changedRows) ? 204 : 500;
        res.status(statusCode);
        res.end();
    },
    async idDelController(req, res) { // url: /api/columns/:id
        
    }
};