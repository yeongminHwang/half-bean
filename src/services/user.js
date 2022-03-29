const db = require("../models");
const { Op } = require("sequelize");

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

  // 다른 회원 정보 조회
  async findOtherUser(login_id) {
    try {
      const user = await db.User.findOne({ where: { login_id: login_id } });

      if (!user) {
        throw new Error("다른 회원 정보 조회 에러");
      } else {
        return user.dataValues;
      }
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

  // 닉네임으로 회원 목록 조회
  async search_By_Nickname(nickname) {
    try {
      let user_list = await db.User.findAll({
        where: {
          nickname: {
            [Op.like]: "%" + nickname + "%",
          },
        },
      });

      if (user_list) {
        user_list = user_list.map((user) => {
          return user.dataValues;
        });
      }

      return user_list;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 전체 회원 목록 조회
  async findAll_User() {
    try {
      let user_list = await db.User.findAll({});

      if (user_list) {
        user_list = user_list.map((user) => {
          return user.dataValues;
        });
      }

      return user_list;
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
