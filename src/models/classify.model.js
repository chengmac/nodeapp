/*
 * @Author: chengmac 
 * @Date: 2019-02-23 18:53:12 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-19 21:51:32
 */

const mongoose = require('../mongodb').mongoose;
const classifylSchema = new mongoose.Schema({
    // 分类
    name: String,

    // 文章id
    articleId: [mongoose.Schema.Types.ObjectId]
});
const Classify = mongoose.model('Classify', classifylSchema);
module.exports = Classify;