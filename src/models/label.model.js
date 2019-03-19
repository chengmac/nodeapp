/*
 * @Author: chengmac 
 * @Date: 2019-03-03 20:52:38 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-19 21:51:17
 */

const mongoose = require('../mongodb').mongoose;

const labelSchema = new mongoose.Schema({
    // 标签
    name: String,

    // 文章id
    articleId: [mongoose.Schema.Types.ObjectId]
});
const Label = mongoose.model('Label', labelSchema);
module.exports = Label;