const LocalStorage = require("passport-local").Strategy;
const sqlQuery = require("../models/sql_query");
const Strategy = require('passport-github2').Strategy;
const { OAUTH_GITHUB_ID, OAUTH_GITHUB_SECRET, OAUTH_GITHUB_CALLBACK } = process.env;
const { insertUser, findUserById, findUserByIdPass } = require("../models/query_str");

const passportSetting = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser(async(user, done) => {
        done(null, user);
    });

    passport.use(new Strategy(
        {
            clientID: OAUTH_GITHUB_ID,
            clientSecret: OAUTH_GITHUB_SECRET,
            callbackURL: OAUTH_GITHUB_CALLBACK,
        },
        async (accessToken, refreshToken, profile, done) => {
            const id = profile.id;
            const name = profile.username;
            let userNo;
            try {
                const params = { "INSERT": [ id, "git", name ], "SELECT": [ id ] };
                await sqlQuery(insertUser, params.INSERT);
                [ userNo ] = await sqlQuery(findUserById, params.SELECT);
            } catch (error) {
                return done(error);
            }
            return done(null, userNo);
        })
    );
    
    passport.use(new LocalStorage({
            usernameField: "user_id",
            passwordField: "user_pass"
        },
        async(username, password, done) => {
            const params = [ username, password ];
            const sqlResult = await sqlQuery(findUserByIdPass, params);
            if (sqlResult.length) return done(null, sqlResult[0]);
            else return done(null, false, { message: "incorrect id or password" });
        }
    ));
};

module.exports = passportSetting;