const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // 引入cors模块
const { Server } = require('socket.io');

const app = http.createServer((req, res) => {
  // ... 处理HTTP请求的代码
});

const io = new Server(app);

io.on('connection', (socket) => {
  console.log('WebSocket 客户端已连接');

  // 处理弹幕数据
  socket.on('danmaku', (data) => {
    // 在这里处理接收到的弹幕数据，例如广播给其他连接的客户端
    io.emit('danmaku', data); // 广播弹幕数据给所有客户端
  });

  socket.on('disconnect', () => {
    console.log('WebSocket 客户端已断开连接');
  });
});

const port = 5505;
app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
});