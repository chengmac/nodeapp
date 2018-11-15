/*
 * @Author: chengmac 
 * @Date: 2018-10-26 23:17:41 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-11-15 21:27:43
 */

const mongoose = require('../mongodb').mongoose;
const mongoosePaginate = require('mongoose-paginate');

const articleSchema = new mongoose.Schema({
    // 标题
    title: { type: String, default: '' },

    // 分类
    classify: { type: String, default: '' },

    // 标签
    tag: { type: Array, default: [] },

    // 内容
    content: {type: String, default: ''},

    // 时间
    createTime: {type: Date, default: Date.now}
});
// 分页插件
articleSchema.plugin(mongoosePaginate);
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;