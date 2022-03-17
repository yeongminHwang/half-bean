const { Router } = require("express");
const user_service = require("../../services/user");
const { isMaster } = require("./middlewares");

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
  router.post("/:userId", async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const userInput = req.body;

      const user = await user_service.updateUser(userId, userInput);

      return res.status(200).json({ success: true, response: user });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 회원 탈퇴
  router.delete("/:userId", async (req, res, next) => {
    try {
      const userId = req.params.userId;

      const isDeleted = await user_service.deleteUser(userId);

      return res
        .status(isDeleted ? 200 : 400)
        .json({ success: isDeleted, response: { isDeleted: isDeleted } });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 관리자_회원강제 탈퇴
  router.delete("/admin/:userId", isMaster, async (req, res, next) => {
    try {
      const target_userId = req.params.userId;

      const isDeleted = await user_service.deleteUser_admin(target_userId);

      return res
        .status(isDeleted ? 200 : 400)
        .json({ success: isDeleted, response: { isDeleted: isDeleted } });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 관리자_회원탈퇴 복구
  router.post(
    "/admin/restoration/:userId",
    isMaster,
    async (req, res, next) => {
      try {
        const target_userId = req.params.userId;

        const isRestored = await user_service.reStoreUser_admin(target_userId);

        return res
          .status(isRestored ? 200 : 400)
          .json({ success: true, response: { isRestored: isRestored } });
      } catch (e) {
        res.status(400).json({ success: false, errorMsg: e.message });
      }
    }
  );
};
