module.exports = {
    insertUser: "insert into tbl_user(user_id, user_pass, user_name) values(?, ?, ?);",
    insertUserWithAdmin: "insert into tbl_user(user_id, user_pass, user_name, admin) values(?, ?, ?, ?);",
    findUserAll: "select user_id, user_pass, user_name, admin, exit_date from tbl_user;",
    findUserById: "select user_id, user_pass, user_name, admin, exit_date from tbl_user where user_id=?;",
    findUserByIdPass: "select user_id, user_pass, user_name, admin, exit_date from tbl_user where user_id=? and user_pass=?;",
    updateUserById: "update tbl_user set user_pass=?, user_name=?, admin=? where user_id=?;",
    setExitDateOfUser: "update tbl_user set exit_date=CURRENT_DATE() where user_id=?;",

    incAllCardIdx: "update tbl_card set card_idx = card_idx + 1;",
    insertCard: "insert into tbl_card(card_title, card_contents, card_idx, column_id, created_by) values(?, ?, ?, ?, ?);",
    insertCardFile: "insert into tbl_card_files(card_id, card_file_type, card_file_name) values(?, ?, ?);",
    findCardById: "select card_id, card_title, card_contents, card_idx, column_id, created_by from tbl_card where card_id=?;",
    findCardByUser: "select card_id, card_title, card_contents, card_idx, column_id, created_by from tbl_card where created_by=? order by card_idx asc;",
    updateCardById: "update tbl_card set card_title=?, card_contents=?, card_idx=?, column_id=? where card_id=?;",
    deleteCardById: "delete from tbl_card where card_id=?;",

    insertColumn: "insert into tbl_column(column_name, column_idx, project_id, created_by) values(?, ?, ?, ?);",
    findColumnsByProjectId: "select column_id, column_name, column_idx, project_id, created_by from tbl_column where project_id=? order by column_idx asc;",
    findColumnById: "select column_id, column_name, column_idx, project_id, created_by from tbl_column where column_id=?;",
    updateColumnById: "update tbl_column set column_name=?, column_idx=? where column_id=?;",
    deleteColumnById: "delete from tbl_column where column_id=?;",

    insertLog: "insert into tbl_log(project_id, created_by, target, target_id, action_id, log_describe) values(?, ?, ?, ?, ?, ?);",
    findLogsByUserId: "select project_id, created_by, created_time, target, target_id, action_id, log_describe where created_by=?;",

    incProjectIdx: "update tbl_project set project_idx = project_idx + 1;",
    insertProject: "insert into tbl_project(project_name, project_idx, created_by) values(?, ?, ?);",
    findProjectById: "select * from tbl_project where project_id=?;",
    findProjectsByUserId: "select project_id, project_name, project_idx, created_by from tbl_project where created_by=? order by project_idx asc;",
    findAuthByUserIdProjectId: "select authority from tbl_auth where user_id=? and project_id=?;",
    updateProjectById: "update tbl_project set project_name=?, project_idx=? where project_id=?;",
    deleteProjectById: "delete from tbl_project where project_id=?;"
};