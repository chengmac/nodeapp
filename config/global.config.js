/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:56:11 
 * @Last Modified by: chengmac
 * @Last Modified time: 2020-11-08 20:27:16
 */

// 访问端口
exports.APP = {
    port: 5000
};

exports.MONGODB = {
    // 根据环境变量来切换数据库地址
    uri: process.env.NODE_ENV === "development" ? 
    "mongodb://120.53.236.75:27017/nodeService" :
    "mongodb://120.53.236.75:27017/nodeService"
};

//
exports.AUTH = {
    jwtTokenSecret: 'node',
    defaultPassword: 'javascript',
    defaultUsername: 'chengmac'
};

// 七牛云上传配置
exports.QINIU = {
    keys: {
        accessKey : 'MAGxw6UyD_x6YwDmJ0S3DA2AE45hn9ihrE01PVgV',
        secretKey : '1EB_HcgJis5iw71YFPftqv8Q_VK6eGdT8N2jQFuJ',
    },
    options: {
        scope: 'chengmac'
    }
};

// 博客默认分类
exports.classify = ['前端', '服务端', '数据库', '其他']

