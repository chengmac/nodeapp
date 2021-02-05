/*
 * @Author: chengmac
 * @Date: 2019-02-23 18:53:12
 * @Last Modified by: chengmac
 * @Last Modified time: 2021-01-10 20:27:00
 */

const mongoose = require('../mongodb').mongoose;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);
const categorySchema = new mongoose.Schema({
//     classify_id: {type: String},
    // 分类
    name: {type: String},

    // 是否包含二级子分类
    submenu: {type: Boolean}
}, {
    versionKey: false // 取消__v字段
});

// 自增 ID 插件配置
categorySchema.plugin(autoIncrement.plugin, {
    model: 'Category',
    field: 'categoryId',
    startAt: 1,
    incrementBy: 1
});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
