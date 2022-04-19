const { Router } = require("express");
const user_service = require("../../services/user");

const router = Router();

module.exports = (app) => {
  // ***/api/user 로 들어오는 요청 처리 담당
  app.use("/user", router);

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
  router.put("/", async (req, res, next) => {
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

  // 내 정보 조회
  router.get("/status", async (req, res, next) => {
    try {
      const login_id = req.body.login_id;
      const user = await user_service.readUser(login_id);

      return res.status(200).json({ success: true, response: user });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 관리자_회원강제 탈퇴
  router.delete("/admin", async (req, res, next) => {
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

  // 관리자_닉네임으로 회원 목록 조회
  router.get("/admin/nickname", async (req, res, next) => {
    try {
      const nickname = req.body.nickname;
      const user_list = await user_service.search_By_Nickname(nickname);

      return res.status(200).json({
        success: true,
        response: { count: user_list.length, user_list: user_list },
      });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 관리자_전체 회원 목록 조회
  router.get("/admin/all", async (req, res, next) => {
    try {
      const user_list = await user_service.findAll_User();

      return res.status(200).json({
        success: true,
        response: { count: user_list.length, user_list: user_list },
      });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 관리자_회원탈퇴 복구
  router.post("/admin/restoration", async (req, res, next) => {
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

  // 관리자_회원 정보 조회
  router.get("/admin/:userId", async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const user = await user_service.findUser_admin(userId);

      return res.status(200).json({ success: true, response: user });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 다른 회원 정보 조회
  router.get("/:userId", async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const user = await user_service.findOtherUser(userId);

      return res.status(200).json({ success: true, response: user });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });
};
