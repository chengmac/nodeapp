/*
 * @Author: chengmac 
 * @Date: 2018-11-05 20:14:13 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-04-28 21:53:38
 */

const mongoose = require('../mongodb').mongoose;
const messageSchema = new mongoose.Schema({
    // 名称
    name: {type: String, default: ''},
    // 创建时间
    createTime: {type: Date, default: Date.now},
    // 是否已读
    isRead: {type: Boolean, default: false}

}, {
    versionKey: false // 取消__v字段
});
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;