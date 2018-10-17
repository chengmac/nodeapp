/*
 * @Author: chengmac 
 * @Date: 2018-10-14 15:09:01 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-10-15 23:55:22
 */

const mongoose = require('mongoose');
const config = require('./config');

// 解决过期的promise
mongoose.Promise = global.Promise;
exports.mongoose = mongoose;

exports.connect = () => {
    // 连接数据库
    mongoose.connect(config.MONGODB.uri);

    // 连接错误
    mongoose.connection.on('error', error => {
        consola.warn('数据库连接失败!', error);
    });

    // 连接成功
    mongoose.connection.once('open', () => {
        consola.ready('数据库连接成功!');
    });

    return mongoose;
};