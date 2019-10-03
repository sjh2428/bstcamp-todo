const sqlQuery = require("../../models/sql_query");
const { incAllCardIdx, insertCard, insertCardFile, findCardById,
    findCardByUser, updateCardById, deleteCardById } = require("../../models/query_str");
const upload2ncloud = require("../../modules/upload2ncloud");

module.exports = {
    async postController(req, res) { // url: /api/cards
        const { body: { card_title, card_contents, column_id }, user: { user_id } } = req;
        const params = [ card_title, card_contents, 0, column_id, user_id ];
        const sqlRes = await sqlQuery(incAllCardIdx + insertCard, params);

        for (const file of req.files) {
            const { originalname, buffer, mimetype } = file;
            const params = [ sqlRes[INSERT].insertId, mimetype, originalname ];
            await upload2ncloud(originalname, buffer);
            await sqlQuery(insertCardFile, params);
        }

        const [ UPDATE, INSERT ] = sqlRes;
        let statusCode;
        if (INSERT.insertId === 0) statusCode = 204;
        else statusCode = (UPDATE.changedRows && INSERT.affectedRows) ? 204 : 500;
        res.status(statusCode);
        res.end();
    },
    async getController(req, res) { // url: /api/cards
        const { user_id } = req.user;
        const param = [ user_id ];
        const sqlRes = await sqlQuery(findCardByUser, param);
        const statusCode = sqlRes ? 200 : 500;
        if (statusCode === 200) res.json(sqlRes);
        res.status(statusCode);
        res.end();
    },
    async idGetController(req, res) { // url: /api/cards/:id
        const { id } = req.params;
        const param = [ id ];
        const sqlRes = await sqlQuery(findCardById, param);
        const statusCode = sqlRes ? 200 : 500;
        if (statusCode === 200) res.json(sqlRes);
        res.status(statusCode);
        res.end();
    },
    async idPutController(req, res) { // url: /api/cards/:id
        const { body: { card_title, card_contents, card_idx, column_id }, params: { id } } = req;
        const params = [ card_title, card_contents, card_idx, column_id, id ];
        const [ sqlRes ] = await sqlQuery(updateCardById, params);
        const statusCode = (sqlRes && sqlRes.changedRows) ? 204 : 500;
        res.status(statusCode);
        res.end();
    },
    async idDelController(req, res) { // url: /api/cards/:id
        const { id } = req.params;
        const param = [ id ];
        const [ sqlRes ] = await sqlQuery(deleteCardById, param);
        const statusCode = (sqlRes && sqlRes.affectedRows) ? 204 : 500;
        res.status(statusCode);
        res.end();
    }
};