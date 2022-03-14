const { Router } = require("expres");
const user_service = require("../../services/user");

const router = Router();

module.exports = (app) => {
  // ***/api/user 로 들어오는 요청 처리 담당
  app.use("/user", router);

  // ***/api/user/create, POST 요청시 처리
  router.post("/create", async (req, res, next) => {
    try {
      const user = await user_service.createUser(req.body);

      return res.status(200).json({ success: true, response: user });
    } catch (e) {
      res.status(201).json({ success: false, errorMsg: e.message });
    }
  });
};
