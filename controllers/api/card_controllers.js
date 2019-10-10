const sqlQuery = require("../../models/sql_query");
const { incAllCardIdx, insertCard, insertCardFile, findCardById,
    findCardByUser, updateCardById, deleteCardById } = require("../../models/query_str");
const upload2ncloud = require("../../middleware/upload2ncloud");

module.exports = {
    async postController(req, res) { // url: /api/cards
        const { body: { card_title, card_contents, column_id }, user: { user_id } } = req;
        const params = [ card_title, card_contents, 0, column_id, user_id ];
        let statusCode;
        try {
            await sqlQuery(incAllCardIdx);
            const sqlRes = await sqlQuery(insertCard, params);
            for (const file of req.files) {
                const { originalname, buffer, mimetype } = file;
                const params = [ sqlRes.insertId, mimetype, originalname ];
                await upload2ncloud(originalname, buffer);
                await sqlQuery(insertCardFile, params);
            }
            statusCode = 201;
            res.status(statusCode).res.json(sqlRes);
        } catch(err) {
            statusCode = 500;
            res.status(statusCode);
            res.end();
        }
    },
    async getController(req, res) { // url: /api/cards
        const { user_id } = req.user;
        const param = [ user_id ];
        let statusCode;
        try {
            const sqlRes = await sqlQuery(findCardByUser, param);
            statusCode = 200;
            res.status(statusCode).json(sqlRes);
        } catch(err) {
            statusCode = 500;
            res.status(statusCode);
            res.end();
        }
    },
    async idGetController(req, res) { // url: /api/cards/:id
        const { id } = req.params;
        const param = [ id ];
        let statusCode;
        try {
            const sqlRes = await sqlQuery(findCardById, param);
            statusCode = 200;
            res.status(statusCode).json(sqlRes);
        } catch(err) {
            statusCode = 500;
            res.status(statusCode);
            res.end();
        }
    },
    async idPutController(req, res) { // url: /api/cards/:id
        const { body: { card_title, card_contents, card_idx, column_id }, params: { id } } = req;
        const params = [ card_title, card_contents, card_idx, column_id, id ];
        let statusCode;
        try {
            await sqlQuery(updateCardById, params);
            statusCode = 204;
        } catch(err) {
            statusCode = 500;
        } finally {
            res.status(statusCode);
            res.end();
        }
    },
    async idDelController(req, res) { // url: /api/cards/:id
        const { id } = req.params;
        const param = [ id ];
        let statusCode;
        try {
            await sqlQuery(deleteCardById, param);
            statusCode = 204;
        } catch(err) {
            statusCode = 500;
        } finally {
            res.status(statusCode);
            res.end();
        }
    }
};