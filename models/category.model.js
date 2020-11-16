/*
 * @Author: chengmac 
 * @Date: 2019-02-23 18:53:12 
 * @Last Modified by: chengmac
 * @Last Modified time: 2020-11-15 20:46:08
 */

const mongoose = require('../mongodb').mongoose;
const globalConfig = require('../config/global.config');
const categorySchema = new mongoose.Schema({
//     classify_id: {type: String},
    // 分类
    name: {type: String},

    // 文章id
    articleId: [mongoose.Schema.Types.ObjectId]
}, {
    versionKey: false // 取消__v字段
});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;