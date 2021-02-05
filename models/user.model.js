/*
 * @Author: chengmac
 * @Date: 2018-10-14 15:07:53
 * @Last Modified by: chengmac
 * @Last Modified time: 2021-01-10 20:28:46
 */

const mongoose = require('../mongodb').mongoose;
const globalConfig = require('../config/global.config');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);
const userSchema = new mongoose.Schema({
    // 名字
    name: { type: String, default: '' },

    // 签名
    slogan: { type: String, default: '' },

    // 头像
    gravatar: { type: String, default: '' },

    // 用户名
    username: { type: String, default: globalConfig.AUTH.defaultUsername },

    // 密码
    password: { type: String, default: globalConfig.AUTH.defaultPassword }
}, {
    versionKey: false // 取消__v字段
});

// 自增 ID 插件配置
userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'userId',
    startAt: 1,
    incrementBy: 1
});
const User = mongoose.model('User', userSchema);
module.exports = User;
