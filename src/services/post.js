const db = require("../models");

module.exports = {
  // 상품 등록
  async createPost(postInfo) {
    try {
      const { dataValues: post } = await db.Post.create({ ...postInfo });

      return post;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  // 상품 수정
  async updatePost(user_id, postInfo) {
    try {
      const update_result = await db.Post.update(
        { ...postInfo },
        { where: { user_id: user_id } }
      );

      const post = await db.Post.findOne({ where: { user_id: user_id } });

      if (!post) {
        throw new Error("상품 업데이트 에러");
      } else {
        return post.dataValues;
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
  async deltePost(post_id) {
    try {
      const post = await db.Post.destroy({
        where: { post_id: post_id },
        force: true,
      });

      return post >= 1 ? true : false;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};
