module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define(
    "ChatRoom",
    {
      chatroom_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "chatroom_id (PK)",
      },
      flag: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "대화종료(0) or 대화중(1)",
      },
    },
    {
      collate: "utf8_general_ci", // 한국어 설정
      charset: "utf8", // 한국어 설정
      modelName: "ChatRoom", //
      tableName: "ChatRoom", // 테이블 이름
      charset: "utf8",
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    }
  );

  ChatRoom.associate = (models) => {
    ChatRoom.hasMany(models.User_join_ChatRoom, {
      foreignKey: "chatroom_id",
      sourceKey: "chatroom_id",
    });
    ChatRoom.hasMany(models.ChatMessage, {
      foreignKey: "chatroom_id",
      sourceKey: "chatroom_id",
    });
  };

  return ChatRoom;
};
