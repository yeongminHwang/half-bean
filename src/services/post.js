const db = require("../models");

module.exports = {
  // 상품 등록
  async createPost(postInfo) {
    try {
      const user_id = postInfo.user_id;
      const isExisted = await db.User.findOne({ where: { user_id: user_id } });

      if (!isExisted) {
        throw new Error("존재하지 않는 회원입니다.");
      }
      const { dataValues: post } = await db.Post.create({ ...postInfo });

      return post;
    } catch (e) {
      throw e;
    }
  },

  // 상품 수정
  async updatePost(user_id, post_id, postInfo) {
    try {
      const uu = await db.Post.update(
        { ...postInfo },
        { where: { user_id: user_id, post_id: post_id } }
      );

      const isUpdate = uu[0] ? true : false;

      if (!isUpdate) {
        throw new Error("다른 회원의 글이거나 존재하지 않는 게시물입니다.");
      }

      const post = await db.Post.findOne({ where: { post_id: post_id } });
      if (!post) {
        throw new Error("상품 업데이트 후 조회 에러");
      }

      return post;
    } catch (e) {
      throw e;
    }
  },

  // 상품 상세 조회
  async findPost(post_id) {
    try {
      const post = await db.Post.findOne({
        where: { post_id: post_id },
        include: {
          model: db.User,
          attributes: [
            "user_id",
            "login_id",
            "name",
            "nickname",
            "email",
            "point",
          ],
        },
      });
      if (!post) {
        throw new Error("상품 상세 조회 에러");
      }

      return post.dataValues;
    } catch (e) {
      throw e;
    }
  },

  // 상품 삭제
  async deltePost(post_id) {
    try {
      const post = await db.Post.destroy({
        where: { post_id: post_id },
        force: true,
      });

      return post >= 1 ? true : false;
    } catch (e) {
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
      console.log(e);
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

  // 조회수 증가
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
