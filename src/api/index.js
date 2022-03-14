const { Router } = require("express");
const user = require("../api/routes/user");

module.exports = () => {
  const app = Router();

  // 라우터 연결
  user(app);
  
  // URL에 따라 서브 라우터로 처리

  return app;
};
