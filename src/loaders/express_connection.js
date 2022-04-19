const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");

const router = require("../api");

// 세션 관리
const session = require("express-session");
//const MySQLStore = require("express-mysql-session")(session);
//const env = process.env.NODE_ENV || "development";
//const config = require("../config/config")[env];

//const sessionStore = new MySQLStore(config);

// env에 저장된거 가져오려고 함,,
require('dotenv').config();
const env2 = process.env;


module.exports = async (app) => {
  try {
    // 세션 관리
    app.use(
      session({
          secret: env2.SESSION_SECRET, // 노출되면 안됨
          //store: sessionStore,
          resave: false,
          saveUninitialized: true,
      })
    );

    app.use(morgan("dev")); // 로그
    app.use(bodyParser.json()); // json 파싱
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(process.env.API_PREFIX, router()); // /api url 요청시 router 모듈로 보냄
  } catch (e) {
    console.log("Express Error");
    console.log(e);
  }

  return app;
};
