/*
 * @Author: chengmac 
 * @Date: 2018-10-26 23:17:41 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-03 19:46:47
 */

const mongoose = require('../mongodb').mongoose;
const mongoosePaginate = require('mongoose-paginate');

const articleSchema = new mongoose.Schema({
    // 标题
    title: { type: String, default: '' },

    // 分类
    classify: { type: String, default: '' },

    // 标签
    label: { type: Array, default: [] },

    // 内容
    content: {type: String, default: ''},

    // 类型 0为原创  1为转载
    type: {type: String, default: '0'},

    // 文章是否公开  true 公开  false 私密
    overt: {type: Boolean, default: true},

    // 创建时间
    createTime: {type: Date, default: Date.now},

    // 更新时间
    updateTime: {type: Date, default: ''}

});
// 分页插件
articleSchema.plugin(mongoosePaginate);
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;