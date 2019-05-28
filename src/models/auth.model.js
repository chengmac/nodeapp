/*
 * @Author: chengmac 
 * @Date: 2018-10-14 15:07:53 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-05-28 23:18:49
 */

const mongoose = require('../mongodb').mongoose;
const globalConfig = require('../config/global.config');
const authSchema = new mongoose.Schema({
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
const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;