const sqlQuery = require("../../models/sql_query");

module.exports = {
    async postController(req, res) { // url: /api/cards
        const { body: { card_title, card_contents, column_id }, user: { user_id } } = req;
        const param = [ card_title, card_contents, 0, column_id, user_id ];
        const sqlRes = await sqlQuery(`
            update tbl_card set card_idx = card_idx + 1;
            insert into tbl_card(card_title, card_contents, card_idx, column_id, created_by)
            values(?, ?, ?, ?, ?);
        `, param);
        const [ UPDATE, INSERT ] = [ 0, 1 ];
        const statusCode = (sqlRes[UPDATE].changedRows && sqlRes[INSERT].affectedRows) ? 201 : 500;
        res.status(statusCode);
        res.end();
    },
    async getController(req, res) { // url: /api/cards
        const { user_id } = req.user;
        const param = [ user_id ];
        const sqlRes = await sqlQuery(`select * from tbl_card where created_by=?`, param);
        res.json(sqlRes);
        res.end();
    },
    async idGetController(req, res) { // url: /api/cards/:id
        const { id } = req.params;
        const param = [ id ];
        const sqlRes = await sqlQuery(`select * from tbl_card where card_id=?`, param);
        res.json(sqlRes);
        res.end();
    },
    async idPutController(req, res) { // url: /api/cards/:id
        const { body: { card_title, card_contents, card_idx, column_id }, params: { id } } = req;
        const param = [ card_title, card_contents, card_idx, column_id, id ];
        const sqlRes = await sqlQuery(`update tbl_card set card_title=?, card_contents=?, card_idx=?, column_id=? where card_id=?;`, param);
        const statusCode = sqlRes.changedRows ? 200 : 500;
        res.status(statusCode);
        res.end();
    },
    async idDelController(req, res) { // url: /api/cards/:id
        const { body: { column_id }, params: { id } } = req;
        const params = [ column_id, id ];
        const sqlRes = await sqlQuery(`delete from tbl_card where column_id=? and card_id=?`, params);
        const statusCode = sqlRes.affectedRows ? 200 : 500;
        res.status(statusCode);
        res.end();
    }
};