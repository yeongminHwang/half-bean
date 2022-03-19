const { response } = require("express");
const { Router } = require("express");
const { login } = require("../../services/auth");
const auth_service = require("../../services/auth");

const router = Router();

module.exports = (app) => {
  // ***/api/auth 로 들어오는 요청 처리 담당
  app.use("/auth", router);

  // 로그인
  // 로그인 할 때 세션 생성해야 함
  router.post("/login", async (req, res, next) => {
    try {
      const { login_id, password } = req.body;

      if (!req.session.logined) {
        console.log(req.session.login_id);
        // 로그인 id, pw 검증 
        const user = await auth_service.login(login_id, password);

        // 세션 저장
        req.session.login_id = login_id;
        req.session.logined = true;
        console.log(req.session);
        // req.session.save(function() {
        //   console.log('[+] 로그인 세션 생성 성공 ',req.session.logined);
        //   return res.status(200).json({ success: true, response: user });
        // });
        return res.status(200).json({ success: true, response: user });
      } else {
        console.log('[-] 로그인이 이미 되어 있는 거 같은데요',req.session.logined);
        return res.status(200).json({ success: true });
      }
      
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 로그아웃
  // 로그아웃 할 때 세션 파괴
  router.post("/logout", async (req, res, next) => {
    try {
      if (req.session.logined) {
        console.log(req.session.login_id);
        // 세션 삭제 ㄲ
        req.session.destroy(
          function (err) {
            console.log('[+] 세션 삭제 성공');
            return res.status(200).json({ success: true});
        });
      } else {
        console.log('[-] 로그인 안되어 있음 ㅇㅅㅇ',req.session.logined);
        return res.status(200).json({ success: true });
      }
      
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false});
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
