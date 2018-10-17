/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:56:11 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-10-16 22:23:42
 */

// 访问端口
exports.APP = {
    port: 5000
};

// 数据库访问地址
exports.MONGODB = {
    uri: `mongodb://127.0.0.1:27017/nodeService`
};

//
exports.AUTH = {
    data: { user: 'root' },
    jwtTokenSecret: 'node',
    defaultPassword: 'javascript',
    defaultUsername: 'chengmac'
};
