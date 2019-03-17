/*
 * @Author: chengmac 
 * @Date: 2018-10-14 15:09:01 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-17 22:22:54
 */

const mongoose = require('mongoose');
const config = require('./config');

// 解决过期的promise
mongoose.Promise = global.Promise;
exports.mongoose = mongoose;

exports.connect = () => {
    // 连接数据库
    mongoose.connect(config.MONGODB.uri, {useNewUrlParser: true}).then(() => {
        // 连接成功
        consola.ready('数据库连接成功!');
    }, error => {
        // 连接错误
        consola.warn('数据库连接失败!', error);
    } );

    return mongoose;
};