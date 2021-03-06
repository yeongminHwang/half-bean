module.exports = (sequelize, DataTypes) => {
  const Point = sequelize.define(
    "Point",
    {
      point_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "point_id (PK)",
      },
      // content, amount, type
      content: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: "point 크기",
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "point 크기",
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "이거 무슨 타입이었죠 ㅇㅅㅇ?",
      },
    },
    {
      collate: "utf8_general_ci", // 한국어 설정
      charset: "utf8", // 한국어 설정
      modelName: "Point", //
      tableName: "Point", // 테이블 이름
      charset: "utf8",
      timestamps: true, // createAt & updateAt 활성화
      paranoid: true, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    }
  );

  Point.associate = (models) => {
    Point.belongsToMany(models.User, {
      through: "Point_history",
      foreignKey: "point_id",
    });
  };

  return Point;
};
