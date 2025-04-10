const express = require('express');
const app = express();
const port = 3000;

// 静态资源目录
app.use(express.static('public'));

// 设置 Cookie 的页面
app.get('/', (req, res) => {
  res.setHeader('Set-Cookie', 'session=abc123; Path=/;');
  res.sendFile(__dirname + '/public/index.html');
});

// 攻击者模拟服务器收集 Cookie
app.get('/steal', (req, res) => {
  console.log('Stolen cookie:', req.query.cookie);
  res.send('Got it!');
});

app.listen(port, () => {
  console.log(`XSS lab running at http://localhost:${port}`);
});
