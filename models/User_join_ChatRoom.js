module.exports = (sequelize, DataTypes) => {

    const User_join_ChatRoom = sequelize.define("User_join_ChatRoom", {
            user_join_chatRoom_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "User_join_ChatRoom (PK)",
            },
        },
        {
            collate: "utf8_general_ci", // 한국어 설정  
            charset: "utf8",            // 한국어 설정  
            modelName: "User_join_ChatRoom",          // 
            tableName: "User_join_ChatRoom",          // 테이블 이름
            charset: "utf8",
            timestamps: true,           // createAt & updateAt 활성화
            paranoid: true,             // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
        });

        /*
        User_join_ChatRoom.associate = models => {
            User_join_ChatRoom.belongsTo(models.ChatRoom, {foreignKey : "user_join_chatRoom_id", sourceKey:"user_join_chatRoom_id"});
        };
        */
        
    return User_join_ChatRoom;
  };