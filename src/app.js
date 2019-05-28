const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
const log4js = require('./config/log4.config');
const qiniu = require('qiniu');
log4js.useLogger(app);

// app modules
const mongodb = require('./mongodb');
const globalConfig = require('./config/global.config');
const routes = require('./routes/routes');

app.set('port', globalConfig.APP.port);
app.use(bodyParser.json({limit: '1mb'}));// 设置参数的大小
app.use(bodyParser.urlencoded({ extended: false }));

// 启动数据库
mongodb.connect();

// 路由
routes(app);

// 启动服务
http.createServer(app).listen(app.get('port'), () => {
	console.log(`server running！port at ${app.get('port')}...`);
});

