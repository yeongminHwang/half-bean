const { Router } = require("express");
const user = require("./routes/user");
const auth = require("./routes/auth");
const post = require("./routes/post");

module.exports = () => {
  const app = Router();

  // 라우터 연결
  user(app);
  auth(app);
  post(app);

  // URL에 따라 서브 라우터로 처리

  return app;
};
