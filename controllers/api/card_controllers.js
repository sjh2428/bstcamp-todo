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

    },
    async idPutController(req, res) { // url: /api/cards/:id

    },
    async idDelController(req, res) { // url: /api/cards/:id
        
    }
};