/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:56:24 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-05-30 21:26:24
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

    // 文章分类
    app.use('/classify', classify());

    // 文章标签
    app.use('/tag', tag());
}

// 账户接口分发
const auth = () => {
    router.post('/login', controller.auth.login);
    return router;
}
// 文章接口分发
const article = () => {
    router.get('/', controller.article.id);
    router.get('/list', controller.article.list);
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
    router.post('/image', controller.upload.image);
    return router;
}

// 分类
const classify = () => {
    router.get('/', controller.other.classify);
    return router;
}

// 标签
const tag = () => {
    router.get('/', controller.other.label);
    return router;
}

module.exports = routes;