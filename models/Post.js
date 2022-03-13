module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define("Post", {
            post_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: "post_id (PK)",
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "제목",
            },
            content: {
                type: DataTypes.STRING(1000),
                allowNull: false,
                comment: "내용",
            },
            category: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: "카테고리 (초소량,대여,배달비쉐어,인력(슈퍼맨))",
            },
            hit: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "조회수",
            },
            blame_count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "게시글이 신고당한 횟수",
            },
            visual_open: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                comment: "게시글 숨김 처리",
            },
            ishurry: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                comment: "긴급게시글 유무",
            },
            image: {
                type: DataTypes.BLOB("long"),
                allowNull: true,
                comment: "게시글에 들어갈 사진",
            },
            /*
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "user_id. . . ? user의 fk여야함..",
            },
            */
        },
        {
            collate: "utf8_general_ci", // 한국어 설정  
            charset: "utf8",            // 한국어 설정  
            modelName: "Post",          // 
            tableName: "Post",          // 테이블 이름
            charset: "utf8",
            timestamps: true,           // createAt & updateAt 활성화
            paranoid: true,             // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
        });

        Post.associate = models => {
            Post.belongsTo(models.User, {foreignKey : "user_id"});
            Post.hasMany(models.User_blame_Post, { foreignKey: "post_id", });
            Post.hasMany(models.User_like_Post, { foreignKey: "post_id", });
          };
      

  
    return Post;
  };