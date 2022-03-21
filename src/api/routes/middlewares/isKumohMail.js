const auth_service = require("../../../services/auth");

module.exports = isKumohMail = async (req, res, next) => {
  try {
    const email = req.body.email;

    const isKumoh = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@kumoh.ac.kr$/;

    isKumoh.test(email);
    if (!isKumoh.test(email)) {
      next(new Error("금오공대 웹메일이 아닙니다."));
    }
    return next();
  } catch (e) {
    throw next(e);
  }
};
