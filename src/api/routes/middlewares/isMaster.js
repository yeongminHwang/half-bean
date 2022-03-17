const user_service = require("../../../services/user");

module.exports = isMaster = async (req, res, next) => {
  try {
    const master_userId = req.body.user_id;

    const isMaster = await user_service.isMaster(master_userId);

    if (!isMaster) {
      next(new Error("관리자 계정이 아닙니다."));
    }
    return next();
  } catch (e) {
    throw next(e);
  }
};
