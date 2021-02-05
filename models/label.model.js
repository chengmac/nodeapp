/*
 * @Author: chengmac
 * @Date: 2019-03-03 20:52:38
 * @Last Modified by: chengmac
 * @Last Modified time: 2021-01-10 20:25:39
 */

const mongoose = require('../mongodb').mongoose;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);
const labelSchema = new mongoose.Schema({
    // 标签
    name: String,

    // label对应颜色
}, {
    versionKey: false // 取消__v字段
});

// 自增 ID 插件配置
labelSchema.plugin(autoIncrement.plugin, {
    model: 'Label',
    field: 'labelId',
    startAt: 1,
    incrementBy: 1
});
const Label = mongoose.model('Label', labelSchema);
module.exports = Label;
