const db = require("../models");

module.exports = {
  // 상품 등록
  async createPost(user_id, postInfo) {
    try {
      const user = { user_id : user_id };
      const postInfo_ = {
        ...postInfo,
        ...user
      }
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
        { where: { user_id: user_id, post_id: post_id} }
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

      return post;
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
};
