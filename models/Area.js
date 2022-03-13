module.exports = (sequelize, DataTypes) => {

    const Area = sequelize.define("Area", {
            area_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "area_id (PK)",
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "name",
            },
        },
        {
            collate: "utf8_general_ci", // 한국어 설정  
            charset: "utf8",            // 한국어 설정  
            modelName: "Area",          // 
            tableName: "Area",          // 테이블 이름
            charset: "utf8",
            timestamps: true,           // createAt & updateAt 활성화
            paranoid: true,             // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
        });

        Area.associate = models => {
            Area.hasMany(models.User, {foreignKey : "area_id", sourceKey:"area_id"});
          };
        
    return Area;
  };