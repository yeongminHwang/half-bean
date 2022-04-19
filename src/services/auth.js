const db = require("../models");
const nodemailer = require("../config/email");
const isKumohMail = require("../api/routes/middlewares/isKumohMail");

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

  // 이메일 인증번호 전송
  async sendCodebyEmail(email) {
    try {
      const transporter = nodemailer.transporter;

      const random_str = Math.random().toString(36).substring(2, 7);
      const { messageId } = await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL, // 보내는 메일의 주소
        to: email, // 수신할 이메일
        subject: "콩반쪽 이메일 인증번호입니다", // 메일 제목
        text:
          random_str.length + "자리 인증번호를 입력해주세요 : " + random_str, // 메일 내용
      });

      return { messageId, random_str };
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 닉네임 중복 확인
  async doubleCheckNickName(nickname) {
    try {
      const isDouble = await db.User.findOne({ where: { nickname: nickname } });

      return { isDouble: isDouble === null ? false : true };
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};
