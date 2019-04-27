/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:56:11 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-04-16 23:22:20
 */

// 访问端口
exports.APP = {
    port: 5000
};

exports.MONGODB = {
    // 根据环境变量来切换数据库地址
    uri: process.env.NODE_ENV === "development" ? 
    "mongodb://39.105.165.222:27017/nodeService" :
    "mongodb://mongo:27017/nodeService"
};

//
exports.AUTH = {
    jwtTokenSecret: 'node',
    defaultPassword: 'javascript',
    defaultUsername: 'chengmac'
};

const log4js = require('log4js');
// log4js 配置
log4js.configure({
    replaceConsole: true,
    appenders: {
        stdout: {//控制台输出
            type: 'stdout'
        },
        req: {//请求日志
            type: 'dateFile',
            filename: 'logs/reqlog/',
            pattern: 'req.log',
            alwaysIncludePattern: true
        },
        err: {//错误日志
            type: 'dateFile',
            filename: 'logs/errlog/',
            pattern: 'err.log',
            alwaysIncludePattern: true
        },
        oth: {//其他日志
            type: 'dateFile',
            filename: 'logs/othlog/',
            pattern: 'oth.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['stdout', 'req'], level: 'debug' },//appenders:采用的appender,取appenders项,level:设置级别
        err: { appenders: ['stdout', 'err'], level: 'error' },
        oth: { appenders: ['stdout', 'oth'], level: 'info' }
    }
});

exports.getLogger = function (name) {
    return log4js.getLogger(name || 'default')
}
//用来与express结合
exports.useLogger = function (app, ) {
    app.use(log4js.connectLogger(log4js.getLogger('default'), {
        format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'//自定义输出格式
    }))
}
