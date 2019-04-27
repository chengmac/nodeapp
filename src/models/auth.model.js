/*
 * @Author: chengmac 
 * @Date: 2018-10-14 15:07:53 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-04-14 13:12:14
 */

const mongoose = require('../mongodb').mongoose;
const config = require('../config');
const authSchema = new mongoose.Schema({
    // 名字
    name: { type: String, default: '' },

    // 签名
    slogan: { type: String, default: '' },

    // 头像
    gravatar: { type: String, default: '' },

    // 用户名
    username: { type: String, default: config.AUTH.defaultUsername },

    // 密码
    password: { type: String, default: config.AUTH.defaultPassword }
}, {
    versionKey: false // 取消__v字段
});
const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;