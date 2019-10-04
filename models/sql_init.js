const sqlQuery = require("./sql_query");
const { createUserTbl, createProjectTbl, createColumnTbl, createCardTbl,
    createCardFilesTbl, createAuthTbl, createActionTbl, createTargetTbl, createLogTbl } = require("./query_str");

const tblQuery = [ createUserTbl, createProjectTbl, createColumnTbl, createCardTbl,
    createCardFilesTbl, createAuthTbl, createActionTbl, createTargetTbl, createLogTbl ];

module.exports = async() => {
    console.log("database initializing");
    for (const query of tblQuery) await sqlQuery(query);
    console.log("data init done");
};