/*
 * @Author: chengmac 
 * @Date: 2019-02-23 18:53:12 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-06 23:05:06
 */

const mongoose = require('../mongodb').mongoose;

const classifylSchema = new mongoose.Schema({
    // 分类
    name: { type: String, default: '' },

    // 文章id
    articleId: { type: Array, default: [] }
});
const Classify = mongoose.model('Classify', classifylSchema);
module.exports = Classify;