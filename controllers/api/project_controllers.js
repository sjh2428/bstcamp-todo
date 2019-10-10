const sqlQuery = require("../../models/sql_query");
const { incProjectIdx, insertProject, findProjectsByUserId, findProjectById,
    updateProjectById, deleteProjectById } = require("../../models/query_str");

module.exports = {
    async postController(req, res) { // url: /api/projects
        const { body: { project_name }, user: { user_id } } = req;
        const project_idx = 0;
        const params = [ project_name, project_idx, user_id ];
        let statusCode;
        try {
            await sqlQuery(incProjectIdx);
            const insertPro = await sqlQuery(insertProject, params);
            statusCode = 201;
            res.status(statusCode).json(insertPro);
        } catch(err) {
            statusCode = 500;
            res.status(statusCode);
            res.end();
        }
    },
    async getController(req, res) { // url: /api/projects
        const { user_id } = req.user;
        const param = [ user_id ];
        let statusCode;
        try {
            const sqlRes = await sqlQuery(findProjectsByUserId, param);
            statusCode = 200;
            res.status(statusCode).json(sqlRes);
        } catch(err) {
            statusCode = 500;
            res.status(statusCode);
            res.end();
        }
    },
    async idGetController(req, res) { // url: /api/projects/:id
        const { id } = req.params;
        const param = [ id ];
        let statusCode;
        try {
            const sqlRes = await sqlQuery(findProjectById, param);
            statusCode = 200;
            res.status(statusCode).json(sqlRes);
        } catch(err) {
            statusCode = 500;
            res.status(statusCode);
            res.end();
        }
    },
    async idPutController(req, res) { // url: /api/projects/:id
        const { body: { project_name, project_idx }, params: { id } } = req;
        const params = [ project_name, project_idx, id ];
        let statusCode;
        try {
            await sqlQuery(updateProjectById, params);
            statusCode = 204;
        } catch(err) {
            statusCode = 500;
        } finally {
            res.status(statusCode);
            res.end();
        }
    },
    async idDelController(req, res) { // url: /api/projects/:id
        const { params: { id } } = req;
        const param = [ id ];
        let statusCode;
        try {
            await sqlQuery(deleteProjectById, param);
            statusCode = 204;
        } catch(err) {
            statusCode = 500;
        } finally {
            res.status(statusCode);
            res.end();
        }
    }
};