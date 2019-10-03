const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const dotenv = require("dotenv");
const helmet = require("helmet");
const passport = require("passport");
const flash = require("connect-flash");

const passportSetting = require("./passport");

const sqlInit = require("./models/sql_init");

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin_routers/index");
const apiRouter = require("./routes/api_routers/index");

const app = express();

app.use(helmet());
dotenv.config();

const { REDIS_PORT, REMOTE_HOST } = process.env;
const redisClient = redis.createClient(REDIS_PORT, REMOTE_HOST);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  store: new RedisStore({
    client: redisClient,
    host: process.env.REMOTE_HOST,
    port: process.env.REDIS_PORT
  }),
  secret: "secret",
  resave: false, // 요청 때 세션이 수정된게 없으면 강제로 세션 저장
  saveUninitialized: false, // 저장된게 없으면 세션 저장
  cookie: { maxAge: 1000 * 60 * 5 } // cookie의 expire time을 connect-redis가 세션의 expire time으로 지정해줌
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passportSetting(passport);

redisClient.on("connect", () => console.log("redis connected"));
redisClient.on("error", (err) => console.log(err));

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);

sqlInit();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
