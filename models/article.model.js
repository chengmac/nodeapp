/*
 * @Author: chengmac 
 * @Date: 2018-10-26 23:17:41 
 * @Last Modified by: chengmac
 * @Last Modified time: 2020-11-15 22:52:41
 */

const mongoose = require('../mongodb').mongoose;
const mongoosePaginate = require('mongoose-paginate');

const articleSchema = new mongoose.Schema({
    // 标题
    title: { type: String, default: ''},

    // 分类
    category: { type: String, default: '' },

    // 标签
    label: { type: Array, default: [] },

    // 内容
    content: {type: String, default: ''},

    // 类型 0为原创  1为转载
    type: {type: String, default: '0'},

    // 文章是否公开  true 公开  false 私密
    private: {type: Boolean, default: true},

    // 创建时间
    createTime: {type: Date, default: Date.now},

    // 更新时间
    updateTime: {type: Date, default: ''},

    //关键字
    keywords: { type: String},

    // 是否发布 PUB 发布 DRA 草稿 DEL 删除
    status: {type: String, default: true},

    // 封面大图
    heroImage: {type: String, default: ''},

}, {
    versionKey: false // 取消__v字段
});
// 分页插件
articleSchema.plugin(mongoosePaginate);
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;