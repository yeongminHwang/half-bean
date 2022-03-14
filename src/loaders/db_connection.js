// index.js에 있는 db.sequelize 객체 모듈을 불러옴
const { sequelize } = require("../models");

module.exports = async (app) => {
  try {
    sequelize
      .sync({ force: false })
      .then(() => {
        console.log("[+] 데이터베이스 연결 성공!");
      })
      .catch((err) => {
        console.log(
          "[-] 데이터베이스 연결 실패, mysql 켰는지, 비번 등등 확인해보세요. "
        );
        console.error(err);
      });
  } catch (e) {
    console.log("DB Connection Error");
    console.log(e);
  }

  return app;
};
