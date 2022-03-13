module.exports = (sequelize, DataTypes) => {

    const Point_history = sequelize.define("Point_history", {
            point_history_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "point_history_id (PK)",
            },
        },
        {
            collate: "utf8_general_ci", // 한국어 설정  
            charset: "utf8",            // 한국어 설정  
            modelName: "Point_history",          // 
            tableName: "Point_history",          // 테이블 이름
            charset: "utf8",
            timestamps: true,           // createAt & updateAt 활성화
            paranoid: true,             // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
        });

        /*
        Point_history.associate = models => {
            Point_history.belongsTo(models.User, {foreignKey : "point_history_id"});
            Point_history.belongsTo(models.Point, {foreignKey : "point_history_id"});
        };
        */
 
  
    return Point_history;
  };