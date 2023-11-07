const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors())
// 配置 Multer 来处理文件上传
const storage = multer.memoryStorage(); // 存储图像数据在内存中
const upload = multer({ storage: storage });

// 设置静态文件目录，用于访问上传的图像
app.use(express.static('public'));

// POST 请求处理上传
app.post('/upload', upload.single('screenshot'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('没有文件上传');
    }

    // 处理上传的图像，例如保存到服务器上的某个目录
    // 这里简单地将图像数据存储在 public 目录下
    const fileName = `screenshot_${Date.now()}.png`;
    const path = `public/${fileName}`;

    require('fs').writeFile(path, req.file.buffer, (err) => {
        if (err) {
            console.error('保存文件失败：', err);
            return res.status(500).send('保存文件失败');
        }

        // 返回图像的访问链接
        res.status(200).json({ success: true, imageUrl: `/${fileName}` });
    });
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});


// 
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const https = require('https');
// const fs = require('fs');
// const app = express();
// const port = 3000;

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// const cors = require('cors');

// app.use(cors());
// app.use(express.json());

// app.use(express.static(path.join(__dirname, 'uploads'));

// app.post('/upload-snapshot', upload.single('snapshot'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded.' });
//   }

//   const fileName = `${Date.now()}-snapshot.png`;
//   const filePath = path.join(__dirname, 'uploads', fileName);

//   const fileBuffer = req.file.buffer;

//   fs.writeFile(filePath, fileBuffer, (err) => {
//     if (err) {
//       console.error('Error saving file:', err);
//       return res.status(500).json({ error: 'File save failed.' });
//     }

//     console.log('File saved:', filePath);

//     res.json({ message: 'File uploaded and saved successfully.' });
//   });
// });

// // 创建HTTPS服务器
// const httpsOptions = {
//   key: fs.readFileSync('your-key.pem'), // 指向您的私钥文件
//   cert: fs.readFileSync('your-cert.pem') // 指向您的证书文件
// };

// const server = https.createServer(httpsOptions, app);

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
