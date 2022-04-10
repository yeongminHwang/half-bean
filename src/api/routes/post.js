const { Router } = require("express");
const { route } = require("express/lib/application");
const post = require("../../services/post");
const post_service = require("../../services/post");

const router = Router();

module.exports = (app) => {
  app.use("/post", router);

  // 상품 등록
  router.post("/", async (req, res, next) => {
    try {
      if (req.session.logined) {
        const user_id = req.session.user_id;
        const postInfo = req.body;
        const post = await post_service.createPost(user_id, postInfo);

        return res.status(201).json({ success: true, response: post });
      } else {
        console.log("[-] 로그인 세션이 존재하지 않습니다.");
        return res.status(201).json({ success: false, response: req.session });
      }
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 수정
  // TODO: hit, blame_count 수정 못하게 해야함
  router.put("/:postId", async (req, res, next) => {
    try {
      if (req.session.logined) {
        const user_id = req.session.user_id;
        const post_id = req.params.postId;
        const postInfo = req.body.modification;
        console.log(post_id);

        const update_result = await post_service.updatePost(
          user_id,
          post_id,
          postInfo
        );

        return res.status(200).json({ success: true, response: update_result });
      } else {
        console.log("[-] 로그인 세션이 존재하지 않습니다.");
        return res.status(201).json({ success: false, response: req.session });
      }
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 내가 등록한 상품 조회
  // 상품이 없으면 false로 response로 보냄
  router.get("/mypost", async (req, res, next) => {
    try {
      if (req.session.logined) {
        const user_id = req.session.user_id;

        const posts = await post_service.findMyPosts(user_id);

        return res
          .status(200)
          .json({
            success: true,
            response: { count: posts.length, posts: posts },
          });
      } else {
        console.log("[-] 로그인 세션이 존재하지 않습니다.");
        return res.status(201).json({ success: false, response: req.session });
      }
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 상세 조회
  // TODO: nickname과 area도 response 받아야 함 (설계 ui보니.. 받아와야할 것 같음)
  router.get("/:postId", async (req, res, next) => {
    try {
      if (req.session.logined) {
        const post_id = req.params.postId;
        const post = await post_service.findPost(post_id);

        return res.status(200).json({ success: true, response: post });
      } else {
        console.log("[-] 로그인 세션이 존재하지 않습니다.");
        return res.status(201).json({ success: false, response: req.session });
      }
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

  // 상품 삭제
  router.delete("/:postId", async (req, res, next) => {
    try {
      if (req.session.logined) {
        const user_id = req.session.user_id;
        const post_id = req.params.postId;
        const isDeleted = await post_service.deltePost(user_id, post_id);

        return res
          .status(200)
          .json({ success: true, response: { isDeleted: isDeleted } });
      } else {
        console.log("[-] 로그인 세션이 존재하지 않습니다.");
        return res.status(201).json({ success: false, response: req.session });
      }
    } catch (e) {
      res.status(400).json({ success: false, errorMsg: e.message });
    }
  });

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
};
