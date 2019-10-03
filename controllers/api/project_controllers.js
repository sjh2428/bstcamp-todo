const sqlQuery = require("../../models/sql_query");

module.exports = {
    async postController(req, res) { // url: /api/projects
        const { body: { project_name }, user: { user_id } } = req;
        const params = [ project_name, 0, user_id ];
        const sqlRes = await sqlQuery(`
            update tbl_project set project_idx = project_idx + 1;
            insert into tbl_project(project_name, project_idx, created_by)
                values(?, ?, ?)`, params);

        const [ UPDATE, INSERT ] = sqlRes;
        let statusCode;
        if (INSERT.insertId === 0) statusCode = 204;
        else statusCode = (UPDATE.changedRows && INSERT.affectedRows) ? 204 : 500;
        res.status(statusCode);
        res.end();
    },
    async getController(req, res) { // url: /api/projects
        const { user_id } = req.user;
        const param = [ user_id ];
        const [ sqlRes ] = await sqlQuery(
            `select project_id, project_name, project_idx, created_by from tbl_project where created_by=?`, param);
        const statusCode = sqlRes ? 200 : 500;
        if (statusCode === 200) res.json(sqlRes);
        res.end();
    },
    async idGetController(req, res) { // url: /api/projects/:id
        const { id } = req.params;
        const param = [ id ];
        const [ sqlRes ] = await sqlQuery(
            `select project_id, project_name, project_idx, created_by from tbl_project where project_id=?`, param);
        const statusCode = sqlRes ? 200 : 500;
        if (statusCode === 200) res.json(sqlRes);
        res.end();
    },
    async idPutController(req, res) { // url: /api/projects/:id
        const { body: { project_name, project_idx }, params: { id } } = req;
        const params = [ project_name, project_idx, id ];
        const [ sqlRes ] = await sqlQuery(
            `update tbl_project set project_name=?, project_idx=? where project_id=?;`, params);
        const statusCode = (sqlRes && sqlRes.changedRows) ? 204 : 500;
        res.status(statusCode);
        res.end();
    },
    async idDelController(req, res) { // url: /api/projects/:id
        const { params: { id } } = req;
        const param = [ id ];
        const [ sqlRes ] = await sqlQuery(`delete from tbl_project where project_id=?`, param);
        const statusCode = (sqlRes && sqlRes.affectedRows) ? 204 : 500;
        res.status(statusCode);
        res.end();
    }
};