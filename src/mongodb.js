/*
 * @Author: chengmac 
 * @Date: 2018-10-14 15:09:01 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-31 16:31:54
 */

const mongoose = require('mongoose');
const config = require('./config');

exports.mongoose = mongoose;
exports.connect = () => {
    // 连接数据库
    mongoose.connect(config.MONGODB.uri, {useNewUrlParser: true}).then(() => {
        // 连接成功
        config.getLogger().info('数据库连接成功!');
    }, error => {
        // 连接错误
        config.getLogger('err').error('数据库连接失败!', error);
    });
    return mongoose;
};