const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // 引入cors模块


const app = http.createServer((req, res) => {
  const corsOptions = {
    origin: ['http://localhost:5001', 'http://localhost:5000', 'http://127.0.0.1:5501'],
    methods: 'GET',
  };

  cors(corsOptions)(req, res, () => {
    // 获取请求的URL
    const url = req.url;
    console.log();
    // 检查请求是否是字幕文件请求
    if (url.startsWith('/subtitles/')) {
      const subtitleFileName = url.replace('/subtitles/', ''); // 提取字幕文件名
      const subtitleFilePath = path.join(__dirname, 'subtitles', subtitleFileName);

      // 使用fs模块读取字幕文件
      fs.readFile(subtitleFilePath, 'utf8', (err, data) => {
        if (err) {
          // 发生错误时返回404 Not Found响应
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Subtitle not found');
        } else {
          // 成功读取文件后返回字幕文件的内容
          res.writeHead(200, { 'Content-Type': 'text/vtt' });
          res.end(data);
        }
      });
    } else {
      
      const filePath = path.join(__dirname, 'dist', '156084836-1-192.mp4');
      fs.readFile(filePath, (err, data) => {
        if (err) {
          // 发生错误时返回404 Not Found响应
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('File not found');
        } else {
          // 成功读取文件后返回视频文件的二进制数据
          res.writeHead(200, { 'Content-Type': 'video/mp4' });
          res.end(data);
        }
      });
    }
  });
});



const port = 5503;
app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});



