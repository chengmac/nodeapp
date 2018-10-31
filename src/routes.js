/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:56:24 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-10-31 22:09:11
 */

const controller = require('./controller');
const routes = app => {
    // 路由拦截器
    app.all('*', (req, res, next) => {
        // Set Header
        const allowedOrigins = ['https://localhost'];
        const origin = req.headers.origin || '';
        if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        };
        res.header('Access-Control-Allow-Headers', 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
        res.header('Access-Control-Allow-Methods', 'PUT,PATCH,POST,GET,DELETE,OPTIONS');
        res.header('Access-Control-Max-Age', '1728000');
        res.header('Content-Type', 'application/json;charset=utf-8');
        res.header('X-Powered-By', 'Nodepress 1.0.0');

        // OPTIONS
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
            return false;
        };
        next();
    });

    app.get('/', (req, res, next) => {
        res.render('index', { title: 'Express' });
    });
    
    //账户相关
    app.all('/auth', controller.auth);

    //文档相关
    app.all('/article', controller.article);
} 

module.exports = routes;