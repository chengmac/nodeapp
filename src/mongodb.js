/*
 * @Author: chengmac 
 * @Date: 2018-10-14 15:09:01 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-05-28 23:25:37
 */

const mongoose = require('mongoose');
const globalConfig = require('./config/global.config');
const Logger = require('./config/log4.config');

exports.mongoose = mongoose;
exports.connect = () => {
    // 连接数据库
    mongoose.connect(globalConfig.MONGODB.uri, {useNewUrlParser: true}).then(() => {
        // 连接成功
        Logger.setLogger().info('数据库连接成功!');
    }, error => {
        // 连接错误
        Logger.setLogger('err').error('数据库连接失败!', error);
    });
    return mongoose;
};