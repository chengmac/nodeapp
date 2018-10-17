const express = require('express');
const http = require('http');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const consola = require('consola');

// app modules

const mongodb = require('./mongodb');
const config = require('./config');
const routes = require('./routes');

app.set('port', config.APP.port);
app.use(bodyParser.json({limit: '1mb'}));// 设置参数的大小
app.use(bodyParser.urlencoded({ extended: false }));

// 启动数据库
mongodb.connect();

// 路由
routes(app);

// 启动服务
http.createServer(app).listen(app.get('port'), () => {
	consola.start(`server running！port at ${app.get('port')}...`);
});

