module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define(
    "ChatMessage",
    {
      chatMessage_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "ChatMessage_id (PK)",
      },
    },
    {
      collate: "utf8_general_ci", // 한국어 설정
      charset: "utf8", // 한국어 설정
      modelName: "ChatMessage", //
      tableName: "ChatMessage", // 테이블 이름
      charset: "utf8",
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    }
  );

  /*
        ChatMessage.associate = models => {
            ChatMessage.belongsTo(models.ChatRoom, {foreignKey : "chatMessage_id", sourceKey:"chatMessage_id"});
        };
        */

  return ChatMessage;
};
