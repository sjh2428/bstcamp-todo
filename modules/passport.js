const LocalStorage = require("passport-local").Strategy;
const sql = require("../models/sql_query");

const passportSetting = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser(async(user, done) => {
        done(null, user);
    });
    
    passport.use(new LocalStorage({
            usernameField: "user_id",
            passwordField: "user_pass"
        },
        async(username, password, done) => {
            const sqlResult = await sql(`select * from tbl_user where user_id='${username}' and user_pass='${password}'`);
            if (sqlResult.length) return done(null, sqlResult[0]);
            else return done(null, false, { message: "incorrect id or password" });
        }
    ));
};

module.exports = passportSetting;