module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
            user_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "user_id (PK)",
            },
            login_id: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "로그인 id",
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "패스워드",
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "이름",
            },
            nickname: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: "닉네임",
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "금오웹메일",
            },
            point: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: "포인트",
            },
            profile_image: {
                type: DataTypes.BLOB("long"),
                allowNull: true,
                defaultValue: null,
                comment: "프로필 이미지",
            },
            setting_Notice: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                comment: "알림설정",
            },
            is_master: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                comment: "관리자 유무",
            },
        },
        {
            collate: "utf8_general_ci", // 한국어 설정  
            charset: "utf8",            // 한국어 설정  
            modelName: "User",          // 
            tableName: "User",          // 테이블 이름
            charset: "utf8",
            timestamps: true,           // createAt & updateAt 활성화
            paranoid: true,             // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
        });

        User.associate = models => {
            User.belongsTo(models.Area, {foreignKey : "area_id", targetkey:"area_id"});
        };


        User.associate = models => {
            User.belongsToMany(models.Point, {through:"Point_history", foreignKey : "user_id"});
        };
        
        //==========================================

        /*
        User.associate = models => {
            User.hasMany(models.Post, {foreignKey : "user_id"});
        };
        
        User.associate = models => {
            User.hasMany(models.User_blame_Post, {foreignKey : "user_id"});
        };
        */

        // User.associate = models => {
        //     User.hasMany(models.User_like_Post, {foreignKey : "user_id", sourceKey:"user_id"});
        // };



  
    return User;
  };