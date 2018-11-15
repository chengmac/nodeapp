/*
 * @Author: chengmac 
 * @Date: 2018-11-05 20:14:13 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-11-05 20:45:08
 */

const mongoose = require('../mongodb').mongoose;
const newsSchema = new mongoose.Schema({
    // 名称
    name: {type: String, default: ''},
    // 内容
    content: {type: String, default: ''},
    // 创建时间
    createTime: {type: Date, default: Date.now},
    // 是否已读
    isRead: {type: Boolean, default: false}

});
const News = mongoose.model('news', newsSchema);

module.exports = News;