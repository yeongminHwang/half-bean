const { response } = require("express");
const { Router } = require("express");
const { login } = require("../../services/auth");
const auth_service = require("../../services/auth");

const router = Router();

module.exports = (app) => {
  // ***/api/auth 로 들어오는 요청 처리 담당
  app.use("/auth", router);

  // 로그인
  router.post("/login", async (req, res, next) => {
    try {
      const { login_id, password } = req.body;

      const user = await auth_service.login(login_id, password);

      return res.status(200).json({ success: true, response: user });
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 아이디 중복확인
  router.get("/doubleCheckId", async (req, res, next) => {
    try {
      const login_id = req.body.login_id;

      const isDouble = await auth_service.doubleCheckId(login_id);

      return res.status(200).json({ success: true, response: isDouble });
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });
};
