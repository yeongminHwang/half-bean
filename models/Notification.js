module.exports = (sequelize, DataTypes) => {

    const Notification = sequelize.define("Notification", {
            notification_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "notification_id (PK)",
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "알림 제목(이름)",
            },
            content: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: "알림 내용",
            },
            type: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: "Notification type이 뭐였죠,,",
            },
        },
        {
            collate: "utf8_general_ci", // 한국어 설정  
            charset: "utf8",            // 한국어 설정  
            modelName: "Notification",          // 
            tableName: "Notification",          // 테이블 이름
            charset: "utf8",
            timestamps: true,           // createAt & updateAt 활성화
            paranoid: true,             // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
        });

        
        Notification.associate = models => {
            // user post chatmessage
            Notification.belongsToMany(models.User, {through:"User_set_Notification", foreignKey : "notification_id"});
        };
        
    return Notification;
  };