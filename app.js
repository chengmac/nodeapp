const express = require('express');
const http = require('http');
const app = express();

// app modules
const mongodb = require('./mongodb');
const globalConfig = require('./config/global.config');
const bodyParser = require('body-parser');
const index = require('./routes');
const user = require('./routes/user');
const message = require('./routes/message');
const article = require('./routes/article');
const interceptor = require('./routes/interceptor');

app.set('port', globalConfig.APP.port);
app.use(bodyParser.json({limit: '1mb'}));// 设置参数的大小
app.use(bodyParser.urlencoded({ extended: false }));
// 启动数据库
mongodb.connect();

// 路由

// 路由拦截器
app.all('*', interceptor);
    
//账户相关
app.use('/', index);

//账户相关
app.use('/api/user', user);
// 消息相关
app.use('/api/message', message);

//文章相关
app.use('/api/article', article);

// 启动服务
http.createServer(app).listen(app.get('port'), () => {
    console.log(`server running！port at ${app.get('port')}...`);
});

