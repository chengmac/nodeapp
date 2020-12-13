/*
 * @Author: chengmac 
 * @Date: 2019-03-03 20:52:38 
 * @Last Modified by: chengmac
 * @Last Modified time: 2020-11-19 23:23:15
 */

const mongoose = require('../mongodb').mongoose;

const labelSchema = new mongoose.Schema({
    // 标签
    name: String,

    // label对应颜色
}, {
    versionKey: false // 取消__v字段
});
const Label = mongoose.model('Label', labelSchema);
module.exports = Label;