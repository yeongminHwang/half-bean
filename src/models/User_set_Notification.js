module.exports = (sequelize, DataTypes) => {
  const User_set_Notification = sequelize.define(
    "User_set_Notification",
    {
      user_set_notification_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "user_set_notification_id (PK)",
      },
      flag: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        comment: "알림 끔(0) or 알림 켬(1)",
      },
    },
    {
      collate: "utf8_general_ci", // 한국어 설정
      charset: "utf8", // 한국어 설정
      modelName: "User_set_Notification", //
      tableName: "User_set_Notification", // 테이블 이름
      charset: "utf8",
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    }
  );

  return User_set_Notification;
};
