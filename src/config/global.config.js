/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:56:11 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-05-28 23:05:08
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

// 七牛云上传配置
exports.QINIU = {
    accessKey : '输入你的key',
    secretKey : '输入你的secretKey',
    bucket_lists: [
        {'test-demo' : '对应的域名链接'},
        {'test-demo1' : '对应的域名链接'}
    ],
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
};

