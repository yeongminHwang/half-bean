const db = require("../models");

module.exports = {
  // 상품 등록
  async createPost(user_id, postInfo) {
    try {
      const user = { user_id: user_id };
      const postInfo_ = {
        ...postInfo,
        ...user,
      };
      const { dataValues: post } = await db.Post.create({ ...postInfo_ });

      return post;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 상품 수정
  async updatePost(user_id, post_id, postInfo) {
    try {
      console.log(user_id);
      console.log(post_id);

      const uu = await db.Post.update(
        { ...postInfo },
        { where: { user_id: user_id, post_id: post_id } }
      );

      if (!uu[0]) {
        throw new Error("다른 회원의 글은 수정할 수 없음");
      } else {
        const post = await db.Post.findOne({ where: { user_id: user_id } });
        if (!post) {
          throw new Error("상품 업데이트 에러");
        } else {
          return post.dataValues;
        }
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 상품 상세 조회
  async findPost(post_id) {
    try {
      const { dataValues: post } = await db.Post.findOne({
        where: { post_id: post_id },
      });
      const user_id = post.user_id;
      console.log(user_id);

      const { dataValues: user } = await db.User.findOne({
        where: { user_id: user_id },
      });

      // 민감 정보 삭제
      delete user.password;
      delete user.is_master;
      delete user.updatedAt;
      delete user.deletedAt;

      var data = new Object();
      data.user = user;
      data.post = post;
      //console.log(data);

      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 상품 삭제
  async deltePost(user_id, post_id) {
    try {
      const post = await db.Post.destroy({
        where: { user_id: user_id, post_id: post_id },
        force: true,
      });

      return post >= 1 ? true : false;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 기능별 전체 상품 조회
  async findPost_by_category(category) {
    try {
      const posts = await db.Post.findAll({
        where: { category: category },
      });

      return posts;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 내가 등록한 상품 조회
  async findMyPosts(user_id) {
    try {
      const posts = await db.Post.findAll({ where: { user_id: user_id } });

      return posts;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  // 내가 찜한 상품 조회
  async findMyWishList(user_id) {
    try {
      let posts = await db.User_like_Post.findAll({
        where: { user_id: user_id },
        include: db.Post,
        attributes: [],
      });

      if (posts) {
        posts = posts.map((post) => {
          return post.Post;
        });
      }

      return posts;
    } catch (e) {
      throw e;
    }
  },

  // 상품 찜
  async wishPost(user_id, post_id) {
    try {
      const isExisted = await db.User_like_Post.findOne({
        where: {
          user_id: user_id,
          post_id: post_id,
        },
      });
      if (isExisted) {
        throw new Error("이미 찜한 상품입니다");
      }

      const { dataValues: wish } = await db.User_like_Post.create({
        user_id: user_id,
        post_id: post_id,
      });

      return wish;
    } catch (e) {
      throw e;
    }
  },

  // 상품찜 취소
  async cancleWishPost(user_id, post_id) {
    try {
      const post = await db.User_like_Post.destroy({
        where: { user_id: user_id, post_id: post_id },
        force: true,
      });

      return post >= 1 ? true : false;
    } catch (e) {
      throw e;
    }
  },

  async plus_hit(post_id) {
    try {
      const isUpdate = await db.Post.increment("hit", {
        by: 1,
        where: { post_id: post_id },
      });

      if (!isUpdate[0][1]) {
        throw new Error("조회수 증가 에러");
      }

      return true;
    } catch (e) {
      throw e;
    }
  },
};
