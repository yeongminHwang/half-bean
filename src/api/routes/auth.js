const { Router } = require("express");
const auth_service = require("../../services/auth");
const user_service = require("../../services/user");

const router = Router();

// Global
const email_verify_table = {};
const FINAL_EMAIL_VERIFY_TIME = 1000 * 60 * 10;

module.exports = (app) => {
  // ***/api/auth 로 들어오는 요청 처리 담당
  app.use("/auth", router);

  // 이메일 인증번호 전송
  router.get("/email", async (req, res, next) => {
    try {
      const email = req.body.email;

      const { messageId, random_str } = await auth_service.sendCodebyEmail(
        email
      );

      email_verify_table[email] = random_str;

      // 10분뒤 인증코드 만료
      const timer = setTimeout(() => {
        delete email_verify_table[email];
        console.log(email_verify_table);
      }, FINAL_EMAIL_VERIFY_TIME);

      return res.status(200).json({ success: true, response: { messageId } });
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 로그인
  // 로그인 할 때 세션 생성해야 함
  router.post("/login", async (req, res, next) => {
    try {
      const { login_id, password } = req.body;
      const user = await auth_service.login(login_id, password); // 로그인 id, pw 검증

      return res.status(200).json({ success: true, response: user });
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 로그아웃
  router.post("/logout", async (req, res, next) => {
    try {
      return res.status(200).json({ success: true, errorMsg: "로그아웃 성공" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 이메일 인증번호 확인
  router.post("/email", async (req, res, next) => {
    try {
      const email = req.body.email;
      const verify_code = req.body.verify_code;

      const isVerify = email_verify_table[email] === verify_code;

      return res.status(isVerify ? 200 : 400).json({
        success: isVerify,
        response: { isVerify: isVerify },
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 아이디 중복확인
  router.get("/doublecheck/id", async (req, res, next) => {
    try {
      const login_id = req.body.login_id;

      const isDouble = await auth_service.doubleCheckId(login_id);

      return res.status(200).json({ success: true, response: isDouble });
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 닉네임 중복 확인
  router.get("/doublecheck/nickname", async (req, res, next) => {
    try {
      const nickname = req.body.nickname;

      const isDouble = await auth_service.doubleCheckNickName(nickname);

      return res.status(200).json({ success: true, response: isDouble });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 비밀번호 재설정
  router.post("/password/reset", async (req, res, next) => {
    try {
      const login_id = req.body.login_id;
      const changePassword = req.body.changePassword;

      const user = await user_service.updateUser(login_id, {
        password: changePassword,
      });

      return res.status(200).json({ success: true, response: user });
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });
};
