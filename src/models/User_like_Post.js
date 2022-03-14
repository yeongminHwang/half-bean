module.exports = (sequelize, DataTypes) => {
  const User_like_Post = sequelize.define(
    "User_like_Post",
    {
      user_like_post_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "user_like_post_id (PK)",
      },
    },
    {
      collate: "utf8_general_ci", // 한국어 설정
      charset: "utf8", // 한국어 설정
      modelName: "User_like_Post", //
      tableName: "User_like_Post", // 테이블 이름
      charset: "utf8",
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    }
  );

  User_like_Post.associate = (models) => {
    User_like_Post.belongsTo(models.User, { foreignKey: "user_id" });
    User_like_Post.belongsTo(models.Post, { foreignKey: "post_id" });
  };

  return User_like_Post;
};
