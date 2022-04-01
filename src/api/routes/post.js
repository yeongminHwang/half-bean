const { Router } = require("express");
const post_service = require("../../services/post");

const router = Router();

module.exports = (app) => {
  app.use("/post", router);

  // 상품 등록
  router.post("/", async (req, res, next) => {
    try {
      const user_id = req.session.user_id;
      const postInfo = req.body;
      const post = await post_service.createPost(user_id, postInfo);

      return res.status(201).json({ success: true, response: post });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 수정
  // TODO: hit, blame_count 수정 못하게 해야함
  router.put("/:postId", async (req, res, next) => {
    try {
      const user_id = req.session.user_id;
      const post_id = req.params.postId;
      const postInfo = req.body.modification;
      console.log(post_id)

      const update_result = await post_service.updatePost(user_id, post_id, postInfo);

      return res.status(200).json({ success: true, response: update_result });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 상세 조회
  router.get("/:postId", async (req, res, next) => {
    try {
      const post_id = req.params.postId;
      const post = await post_service.findPost(post_id);

      return res.status(200).json({ success: true, response: post });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 삭제
  router.delete("/:postId", async (req, res, next) => {
    try {
      const user_id = req.session.user_id;
      const post_id = req.params.postId;
      const isDeleted = await post_service.deltePost(user_id, post_id);

      return res
        .status(200)
        .json({ success: true, response: { isDeleted: isDeleted } });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });
};
