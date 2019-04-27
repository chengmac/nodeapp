/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:56:24 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-31 16:39:59
 */

const controller = require('./controller');
const interceptor = require('./interceptor');

const routes = app => {
    // 路由拦截器
    app.all('*', interceptor);
    
    //账户相关
    app.all(/auth/i, controller.auth);

    //文档相关
    app.all(/article/i, controller.article);

    // 消息相关
    app.all(/news/i, controller.news);

    // 其他
    // app.all(/2/i, controller.other);
} 

module.exports = routes;