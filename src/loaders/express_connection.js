const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");

const router = require("../api");


module.exports = async (app) => {
  try {
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
