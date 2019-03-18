/*
 * @Author: chengmac 
 * @Date: 2019-02-23 18:53:12 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-18 22:43:50
 */

const mongoose = require('../mongodb').mongoose;
const classifylSchema = new mongoose.Schema({
    // 分类
    name: String,

    // 文章id
    articleId: [new mongoose.Schema.Types.ObjectId]
});
const Classify = mongoose.model('Classify', classifylSchema);
module.exports = Classify;