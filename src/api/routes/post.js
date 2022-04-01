const { Router } = require("express");
const post_service = require("../../services/post");

const router = Router();

module.exports = (app) => {
  app.use("/post", router);

  // 상품 등록
  router.post("/", async (req, res, next) => {
    try {
      const postInfo = req.body;
      const post = await post_service.createPost(postInfo);

      return res.status(201).json({ success: true, response: post });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 수정
  router.put("/", async (req, res, next) => {
    try {
      const user_id = req.body.user_id;
      const postInfo = req.body.modification;

      const update_result = await post_service.updatePost(user_id, postInfo);

      return res.status(200).json({ success: true, response: update_result });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 상세 조회
  router.get("/", async (req, res, next) => {
    try {
      const post_id = req.body.post_id;
      const post = await post_service.findPost(post_id);

      return res.status(200).json({ success: true, response: post });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 삭제
  router.delete("/", async (req, res, next) => {
    try {
      const post_id = req.body.post_id;
      const isDeleted = await post_service.deltePost(post_id);

      return res
        .status(200)
        .json({ success: true, response: { isDeleted: isDeleted } });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });
};
