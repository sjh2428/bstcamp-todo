module.exports = {
    createUserTbl: `create table if not exists tbl_user(
        user_id varchar(20) PRIMARY KEY NOT NULL,
        user_pass varchar(20) NOT NULL,
        user_name varchar(20) NOT NULL,
        admin boolean DEFAULT FALSE
    );`,
    createProjectTbl: `create table if not exists tbl_project(
        project_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        project_name varchar(40) NOT NULL,
        project_idx int NOT NULL,
        created_by varchar(20),
        FOREIGN KEY (created_by) REFERENCES tbl_user (user_id) ON UPDATE CASCADE
    );`,
    createColumnTbl: `create table if not exists tbl_column(
        column_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        column_name varchar(40) NOT NULL,
        column_idx int NOT NULL,
        project_id int NOT NULL,
        created_by varchar(20) NOT NULL,
        FOREIGN KEY (project_id) REFERENCES tbl_project (project_id) ON UPDATE CASCADE,
        FOREIGN KEY (created_by) REFERENCES tbl_user (user_id) ON UPDATE CASCADE
    );`,
    createCardTbl: `create table if not exists tbl_card(
        card_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        card_title varchar(100) NOT NULL,
        card_contents TEXT NOT NULL,
        card_idx int NOT NULL,
        column_id int NOT NULL,
        created_by varchar(20) NOT NULL,
        FOREIGN KEY (column_id) REFERENCES tbl_column (column_id) ON UPDATE CASCADE,
        FOREIGN KEY (created_by) REFERENCES tbl_user (user_id) ON UPDATE CASCADE
    );`,
    createCardFilesTbl: `create table if not exists tbl_card_files(
        card_id int NOT NULL,
        card_file_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        card_file_type varchar(255) NOT NULL,
        card_file_name varchar(255) NOT NULL,
        FOREIGN KEY (card_id) REFERENCES tbl_card (card_id) ON UPDATE CASCADE ON DELETE CASCADE
    );`,
    createAuthTbl: `create table if not exists tbl_auth(
        auth_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        project_id int NOT NULL,
        user_id varchar(20) NOT NULL,
        authority tinyint NOT NULL,
        FOREIGN KEY (project_id) REFERENCES tbl_project (project_id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES tbl_user (user_id) ON UPDATE CASCADE ON DELETE CASCADE
    );`,
    createActionTbl: `create table if not exists tbl_action(
        action_id int PRIMARY KEY NOT NULL,
        action_name varchar(20) NOT NULL
    );`,
    createTargetTbl: `create table if not exists tbl_target(
        target_id tinyint PRIMARY KEY NOT NULL,
        target_name varchar(50) NOT NULL
    );`,
    createLogTbl: `create table if not exists tbl_log(
        log_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        project_id int NOT NULL,
        created_by varchar(20),
        created_time timestamp DEFAULT CURRENT_TIMESTAMP,
        target tinyint NOT NULL,
        target_id int NOT NULL,
        action_id int NOT NULL,
        log_describe varchar(255) NOT NULL,
        FOREIGN KEY (project_id) REFERENCES tbl_project (project_id) ON UPDATE CASCADE,
        FOREIGN KEY (created_by) REFERENCES tbl_user (user_id) ON UPDATE CASCADE,
        FOREIGN KEY (action_id) REFERENCES tbl_action (action_id) ON UPDATE CASCADE,
        FOREIGN KEY (target) REFERENCES tbl_target (target_id) ON UPDATE CASCADE
    );`,

    insertUser: "insert into tbl_user(user_id, user_pass, user_name) values(?, ?, ?);",
    insertUserWithAdmin: "insert into tbl_user(user_id, user_pass, user_name, admin) values(?, ?, ?, ?);",
    findUserAll: "select user_id, user_pass, user_name, admin, exit_date from tbl_user;",
    findUserById: "select user_id, user_pass, user_name, admin, exit_date from tbl_user where user_id=?;",
    findUserCntById: "select count(user_id) as cnt from tbl_user where user_id=?",
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
    findLogById: "select log_id, project_id, created_by, created_time, target, target_id, action_id, log_describe where log_id=?",
    findLogsByUserId: "select project_id, created_by, created_time, target, target_id, action_id, log_describe where created_by=?;",

    incProjectIdx: "update tbl_project set project_idx = project_idx + 1;",
    insertProject: "insert into tbl_project(project_name, project_idx, created_by) values(?, ?, ?);",
    findProjectById: "select * from tbl_project where project_id=?;",
    findProjectsByUserId: "select project_id, project_name, project_idx, created_by from tbl_project where created_by=? order by project_idx asc;",
    findAuthByUserIdProjectId: "select * from tbl_auth where user_id=? and project_id=?;",
    updateProjectById: "update tbl_project set project_name=?, project_idx=? where project_id=?;",
    deleteProjectById: "delete from tbl_project where project_id=?;"
};