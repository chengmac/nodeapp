/*
 * @Author: chengmac 
 * @Date: 2019-02-23 18:53:12 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-01 22:29:10
 */

const mongoose = require('../mongodb').mongoose;

const classifyLabelSchema = new mongoose.Schema({
    // 分类
    classify: { type: String, default: '' },

    // 标签
    label: { type: String, default: '' }
});
const ClassifyLabel = mongoose.model('ClassifyLabel', classifyLabelSchema);
module.exports = ClassifyLabel;