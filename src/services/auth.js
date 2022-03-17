const db = require("../models");

module.exports = {
  // 로그인
  async login(login_id, password) {
    try {
      const user = await db.User.findOne({
        where: { login_id: login_id },
      });

      if (!user) {
        throw new Error("등록되지 않은 회원입니다.");
      }

      if (user.password !== password) {
        throw new Error("비밀번호를 다시 한 번 확인해주세요.");
      } else {
        return user;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 아이디 중복 확인
  async doubleCheckId(login_id) {
    try {
      const isDouble = await db.User.findOne({ where: { login_id: login_id } });

      return { isDouble: isDouble === null ? false : true };
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};
