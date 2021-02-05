const express = require('express');
const http = require('http');
const app = express();

// app modules
const mongoose = require('./mongodb');
const globalConfig = require('./config/global.config');
const bodyParser = require('body-parser');
const CookieParser = require("cookie-parser");
const user = require('./routes/user');
const message = require('./routes/message');
const article = require('./routes/article');
const upload = require('./routes/upload');
const muisc = require('./routes/muisc');
const interceptor = require('./routes/interceptor');

app.set('port', globalConfig.APP.port);
app.use(CookieParser());
app.use(bodyParser.json({limit: '1mb'}));// 设置参数的大小
app.use(bodyParser.urlencoded({ extended: false }));

// 启动数据库
mongoose.connect();

// 路由

// 路由拦截器
app.all('*', interceptor);

//账户相关
app.use('/api/user', user);

// 消息相关
app.use('/api/message', message);

//文章相关
app.use('/api/article', article);

// 上传
app.use('/api/upload', upload);

// 音乐
app.use('/api/muisc', muisc);

// 启动服务
http.createServer(app).listen(app.get('port'), () => {
    console.log(`server running！port at ${app.get('port')}...`);
});

