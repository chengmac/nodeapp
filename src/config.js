/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:56:11 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-21 20:54:12
 */

// 访问端口
exports.APP = {
    port: 5000
};

// 数据库访问地址
exports.MONGODB = {
    // 生产环境用上面的地址
    uri: `mongodb://mongo:27017/nodeService`
    // uri: `mongodb://localhost:27017/nodeService`
};

//
exports.AUTH = {
    data: { user: 'root' },
    jwtTokenSecret: 'node',
    defaultPassword: 'javascript',
    defaultUsername: 'chengmac'
};
