/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:56:24 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-08-01 21:48:25
 */

const express = require('express');
const router = express.Router();
const controller = require('../controller');
const interceptor = require('./interceptor');

const routes = app => {
    // 路由拦截器
    app.all('*', interceptor);
    
    //账户相关
    app.use('/auth', auth());

    // 消息相关
    app.use('/message', message());
    
    //文章相关
    app.use('/article', article());

    // 图片上传
    app.use('/upload', upload());
}

// 账户接口分发
const auth = () => {
    router.post('/login', controller.auth.login);
    return router;
}
// 文章接口分发
const article = () => {
    router.get('/single', controller.article.single);
    router.get('/list', controller.article.list);
    router.get('/classify', controller.other.classify);
    router.get('/label', controller.other.label);
    router.post('/save', controller.article.save);
    router.delete('/batchDelete', controller.article.batchDelete);
    return router;
}

// 消息接口分发
const message = () => {
    router.get('/', controller.message.get);
    router.put('/update', controller.message.update);
    return router;
}

// 文章接口分发
const upload = () => {
    router.get('/getToken', controller.upload.getToken);
    return router;
}

module.exports = routes;