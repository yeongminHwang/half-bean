const { Router } = require("express");
const auth_service = require("../../services/auth");
const user = require("../../services/user");
const user_service = require("../../services/user");

const router = Router();

// Global
const email_verify_table = {};
const FINAL_EMAIL_VERIFY_TIME = 1000 * 60 * 10;

module.exports = (app) => {
  // ***/api/auth 로 들어오는 요청 처리 담당
  app.use("/auth", router);

  // 로그인
  // 로그인 할 때 세션 생성해야 함
  router.post("/login", async (req, res, next) => {
    try {
      const { login_id, password } = req.body;
      const user = await auth_service.login(login_id, password); // 로그인 id, pw 검증

      // 현재 접속중인 유저정보 담을 배열 생성
      if (!req.session.users) {
        req.session.users = [];
      }

      // 세션 내 동일 유저 검사 by 로그인 아이디
      req.session.logined = false;
      for (var i = 0; i < req.session.users.length; i++) {
        if (req.session.users[i].login_id === user.dataValues.login_id) {
          req.session.logined = true;
          break;
        }
      }

      // 로그인 되어있지 않은 유저만 세션에 넣도록
      if (!req.session.logined) {
        req.session.users.push(user.dataValues);

        // 세션에 값 추가
        req.session.login_id = user.dataValues.login_id;
        req.session.user_id = user.dataValues.user_id;
        req.session.logined = true;
        if (user.is_master) req.session.admin = true;
        else req.session.admin = false;  
      
      }

      console.log("지금 로그인한 사람 id", req.session.login_id);
      console.log("현재접속인원 : ", req.session.users.length);

      return res.status(200).json({ success: true, response: user });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 로그아웃
  // 로그아웃 할 때 세션 파괴
  router.get("/logout", async (req, res, next) => {
    try {
      if (req.session.logined) {
        const login_id = req.session.login_id;

        // 세션에서 로그인 아이디 찾아서 제거
        for (var i = 0; i < req.session.users.length; i++) {
          if (req.session.users[i].login_id === login_id) {
            req.session.users.splice(i, 1);
            break;
          }
        }

        /*
        세션 삭제하면 req.session.users 이 배열도 함께 삭제됨...
        사용자 값을 req.session.user 에 넣어주고 req.session.user.destory하면 될 것 같기도한데 이거 고치면 다른 api들 검증 로직 다 고쳐야해서 섣불리 못고치겠음
        req.session.destroy(function (err) {
          console.log("[+] 세션 삭제 성공");
        });
        */

        // 로그인 상태 false
        /* 
         세션 지우면 배열도 날아가서 세션 삭제한 척 함 (로그아웃 된 것처럼 로그인해야 접근할 수 있는 api들 접근 안됨)

         나머지 값들도 지워주면 되는데, 현재 상태가 api에 접속할 때 
         req.session.logined가 true인 경우를 검증하기 때문에 
         나머지 값들 안지워줘도 일단은 뭐 괜찮을 거 같음 ㅠㅜ
        */
        req.session.logined = false;

        console.log("현재접속인원 : ", req.session.users.length);

        return res.status(200).json({ success: true });
      } else {
        throw new Error("로그인 되어 있지 않습니다.");
      }
    } catch (e) {
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
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

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
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });
};
