const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.REMOTE_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB_NAME,
    multipleStatements: true
});

const query = async (sql, params = []) => {
    let connection;
    try {
        connection = await pool.getConnection(async conn => conn);
        await connection.beginTransaction();
        const [rows] = await connection.query(sql, params);
        await connection.commit();
        connection.release();
        return rows;
    } catch(err) {
        console.log('DB Error');
        console.log(err);
        await connection.rollback();
        connection.release();
        return false;
    }
};

module.exports = query;