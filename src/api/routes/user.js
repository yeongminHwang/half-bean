const { Router } = require("express");
const user_service = require("../../services/user");
const { isMaster } = require("./middlewares");

const router = Router();

module.exports = (app) => {
  // ***/api/user 로 들어오는 요청 처리 담당
  app.use("/user", router);

  // session check test
  router.get("/test", async (req, res, next) => {
    try {
      if (req.session.logined) {
        console.log("[+] 로그인 세션이 존재합니다. (로긴되어잇음)");
        return res.status(200).json({ success: true });
      } else {
        console.log("[-] 로그인 세션이 존재하지 않습니다.");
        return res.status(201).json({ success: false });
      }
    } catch (e) {
      console.log("[!]");
      res.status(400).json({ success: false });
    }
  });

  // 회원가입
  router.post("/", async (req, res, next) => {
    try {
      const user = await user_service.createUser(req.body);

      return res.status(201).json({ success: true, response: user });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 회원정보 수정
  // TODO : 세션 관리 필요
  router.post("/update", async (req, res, next) => {
    try {
      const login_id = req.body.login_id;
      const userInput = req.body.modification;

      const user = await user_service.updateUser(login_id, userInput);

      return res.status(200).json({ success: true, response: user });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 회원 탈퇴
  // TODO : 세션 관리 필요
  router.delete("/", async (req, res, next) => {
    try {
      const login_id = req.body.login_id;

      const isDeleted = await user_service.deleteUser(login_id);

      return res
        .status(isDeleted ? 200 : 400)
        .json({ success: isDeleted, response: { isDeleted: isDeleted } });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  //===================================================================================
  // 관리자_회원강제 탈퇴
  router.delete("/admin", isMaster, async (req, res, next) => {
    try {
      const target_userId = req.body.user_login_id;

      const isDeleted = await user_service.deleteUser_admin(target_userId);

      return res
        .status(isDeleted ? 200 : 400)
        .json({ success: isDeleted, response: { isDeleted: isDeleted } });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 관리자_회원탈퇴 복구
  router.post("/admin/restoration", isMaster, async (req, res, next) => {
    try {
      const target_userId = req.body.user_login_id;

      const isRestored = await user_service.reStoreUser_admin(target_userId);

      return res
        .status(isRestored ? 200 : 400)
        .json({ success: true, response: { isRestored: isRestored } });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });
};
