const log4js = require('log4js');

// log4js 配置
log4js.configure({
    appenders: {
        nodeapp: {
            type: "dateFile",
            filename: "logs/nodeapp",
            pattern: ".log",
            alwaysIncludePattern: true
        }

    },
    categories: {
        default: { appenders: ['nodeapp'], level: 'info' }
    }
});

module.exports = log4js.getLogger();
