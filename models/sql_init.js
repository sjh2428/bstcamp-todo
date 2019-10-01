const dotenv = require("dotenv");
const sqlQuery = require("./sql_query");
const uuidv1 = require("uuid/v1");
dotenv.config();

module.exports = async() => {
    console.log("database initializing");
    await sqlQuery(`create database if not exists ${process.env.SQL_DB_NAME}`);
    await sqlQuery(`use ${process.env.SQL_DB_NAME}`);
    await sqlQuery(`create table if not exists user(
        user_id varchar(20) PRIMARY KEY NOT NULL,
        user_pass varchar(20) NOT NULL,
        user_name varchar(20) NOT NULL,
        admin boolean DEFAULT FALSE
    );`);
    await sqlQuery(`create table if not exists clumn(
        column_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        column_name varchar(40) NOT NULL,
        column_idx int NOT NULL,
        created_by varchar(20) NOT NULL,
        FOREIGN KEY (created_by) REFERENCES user (user_id)
    );`);
    await sqlQuery(`create table if not exists card(
        card_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        card_title varchar(100) NOT NULL,
        card_contents TEXT NOT NULL,
        card_idx int NOT NULL,
        column_id int NOT NULL,
        created_by varchar(20) NOT NULL,
        FOREIGN KEY (column_id) REFERENCES clumn (column_id),
        FOREIGN KEY (created_by) REFERENCES user (user_id)
    );`);
    await sqlQuery(`create table if not exists card_files(
        card_id int NOT NULL,
        card_file_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        card_file_type varchar(255) NOT NULL,
        card_file_name varchar(255) NOT NULL,
        FOREIGN KEY (card_id) REFERENCES card (card_id)
    );`);
    await sqlQuery(`create table if not exists auth(
        auth_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        card_id int NOT NULL,
        user_id varchar(20) NOT NULL,
        authority tinyint NOT NULL,
        FOREIGN KEY (card_id) REFERENCES card (card_id),
        FOREIGN KEY (user_id) REFERENCES user (user_id)
    );`);
    await sqlQuery(`create table if not exists action(
        action_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        action_name varchar(20) NOT NULL
    );`);
    await sqlQuery(`create table if not exists log(
        log_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        created_by varchar(20) NOT NULL,
        created_time timestamp DEFAULT CURRENT_TIMESTAMP,
        target tinyint NOT NULL,
        target_id int NOT NULL,
        action_id int NOT NULL,
        log_describe varchar(255) NOT NULL,
        FOREIGN KEY (created_by) REFERENCES user (user_id),
        FOREIGN KEY (action_id) REFERENCES action (action_id)
    );`);
    console.log("data init done");
};