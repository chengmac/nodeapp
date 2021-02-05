/*
 * @Author: chengmac
 * @Date: 2018-10-14 15:09:01
 * @Last Modified by: chengmac
 * @Last Modified time: 2021-01-17 18:43:38
 */

const mongoose = require('mongoose');
const globalConfig = require('./config/global.config');
const Logger = require('./utils/logger');

exports.mongoose = mongoose;
exports.connect = () => {
    // 连接数据库
    mongoose.connect(globalConfig.MONGODB.uri, {useNewUrlParser: true}).then(() => {
        // 连接成功
        Logger.info('the mongodb connected success...');
    }, error => {
        // 连接错误
        Logger.info('the mongodb connect fial', error);
    });
    return mongoose;
};
