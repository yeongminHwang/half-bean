const db = require("../models");

module.exports = {
  // 회원가입
  async createUser(userInput) {
    try {
      const { dataValues: user } = await db.User.create({ ...userInput });
      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 회원정보 수정
  async updateUser(login_id, userInput) {
    try {
      await db.User.update({ ...userInput }, { where: { login_id: login_id } });

      const user = await db.User.findOne({
        where: { login_id: login_id },
      });

      if (!user) {
        throw new Error("회원정보 업데이트 에러");
      } else {
        return user.dataValues;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 회원탈퇴
  async deleteUser(login_id) {
    try {
      const user = await db.User.destroy({
        where: { login_id: login_id },
        force: true, // 테이블에서 강제 삭제 옵션
      });

      return user >= 1 ? true : false;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 회원탈퇴_관리자
  async deleteUser_admin(login_id) {
    try {
      const user = await db.User.destroy({
        where: { login_id: login_id },
      });

      return user >= 1 ? true : false;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 회원탈퇴 복구_관리자
  async reStoreUser_admin(login_id) {
    try {
      const user = await db.User.restore({
        where: { login_id: login_id },
      });

      return user >= 1 ? true : false;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 관리자 확인
  /*
  async isMaster(master_login_id) {
    try {
      const user = await db.User.findOne({
        where: { login_id: master_login_id },
      });

      if (!user) {
        return false;
      } else {
        return user.dataValues.is_master;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  */
};
