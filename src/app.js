const express = require("express");
const loader = require("./loaders");

const app = express();

// configuration =========================
app.set("port", process.env.PORT || 5000);

// Loader불러와서 서버 객체 주입
loader(app);

// 테스트
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 서버 실행
app.listen(app.get("port"), () => {
  console.log("[*] " + app.get("port") + "번 포트에서 대기 중");
});
