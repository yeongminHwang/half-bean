const { Router } = require("express");
const post_service = require("../../services/post");

const router = Router();

module.exports = (app) => {
  app.use("/post", router);

  // 기능별 전체 상품 조회
  router.get("/", async (req, res, next) => {
    try {
      const category = req.query.category;

      const posts = await post_service.findPost_by_category(category);

      return res.status(200).json({
        success: true,
        response: { count: posts.length, posts: posts },
      });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

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

  // 내가 등록한 상품 조회
  // 상품이 없으면 false로 response로 보냄
  router.get("/mypost", async (req, res, next) => {
    try {
      const user_id = req.body.user_id;

      const posts = await post_service.findMyPosts(user_id);

      return res.status(200).json({
        success: posts.length !== 0 ? true : false,
        response: { count: posts.length, posts: posts },
      });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 내가 찜한 상품 조회
  router.get("/mywishlist", async (req, res, next) => {
    try {
      const user_id = req.body.user_id;

      const posts = await post_service.findMyWishList(user_id);

      return res.status(200).json({
        success: true,
        response: { count: posts.length, posts: posts },
      });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 찜
  router.post("/wishlist", async (req, res, next) => {
    try {
      const user_id = req.body.user_id;
      const post_id = req.body.post_id;

      const wish = await post_service.wishPost(user_id, post_id);

      return res.status(200).json({ success: true, response: wish });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.name });
    }
  });

  // 조회수 증가
  router.put("/hit", async (req, res, next) => {
    try {
      const post_id = req.body.post_id;

      const isUpdate = await post_service.plus_hit(post_id);

      return res
        .status(200)
        .json({ success: isUpdate, response: { isUpdate: isUpdate } });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 찜 취소
  router.delete("/wishlist", async (req, res, next) => {
    try {
      const user_id = req.body.user_id;
      const post_id = req.body.post_id;

      const isCancled = await post_service.cancleWishPost(user_id, post_id);

      return res
        .status(isCancled ? 200 : 400)
        .json({ success: isCancled, response: { isCancled: isCancled } });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.name });
    }
  });

  // 상품 상세 조회
  // TODO: nickname과 area도 response 받아야 함 (설계 ui보니.. 받아와야할 것 같음)
  router.get("/:postId", async (req, res, next) => {
    try {
      const post_id = req.params.postId;
      const post = await post_service.findPost(post_id);

      return res.status(200).json({ success: true, response: post });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 수정
  // TODO: hit, blame_count 수정 못하게 해야함
  router.put("/:postId", async (req, res, next) => {
    try {
      const user_id = req.body.user_id;
      const postInfo = req.body.modification;
      const post_id = req.params.postId;

      const update_result = await post_service.updatePost(
        user_id,
        post_id,
        postInfo
      );

      return res.status(200).json({ success: true, response: update_result });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 삭제
  router.delete("/:postId", async (req, res, next) => {
    try {
      const post_id = req.params.postId;
      const isDeleted = await post_service.deltePost(post_id);

      return res
        .status(200)
        .json({ success: true, response: { isDeleted: isDeleted } });
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });
};
