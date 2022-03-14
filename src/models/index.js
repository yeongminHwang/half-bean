"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

// config/config.json 파일에 있는 설정값들을 불러온다.
// config객체의 env변수(development)키 의 객체값들을 불러온다.
// 즉, 데이터베이스 설정을 불러온다고 말할 수 있다.
const config = require("../config/config")[env];
const db = {};

// new Sequelize를 통해 MySQL 연결 객체를 생성한다.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// 우리가 작성한 Table파일을 찾아온다.
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

//DB에 모델이름을 연결한다.
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
