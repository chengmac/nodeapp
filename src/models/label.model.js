/*
 * @Author: chengmac 
 * @Date: 2019-03-03 20:52:38 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-08 20:19:19
 */

const mongoose = require('../mongodb').mongoose;

const labelSchema = new mongoose.Schema({
    // 标签
    name: { type: String, default: '' },

    // 文章id
    articleId: { type: Array, default: [] }
});
const Label = mongoose.model('Label', labelSchema);
module.exports = Label;