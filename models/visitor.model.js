const mongoose = require('../mongodb').mongoose;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);
const visitorSchema = new mongoose.Schema({

    ip: String,
    country: {type: String, default: '中国'},
    city: String,
    province: String,
    os: String,
    osVersion: String,
    browser: String,
    browserVersion: String,
    visitorTime: {type: Date, default: Date.now},

}, {
    versionKey: false // 取消__v字段
});

// 自增 ID 插件配置
visitorSchema.plugin(autoIncrement.plugin, {
    model: 'Visitor',
    field: 'visitorId',
    startAt: 1,
    incrementBy: 1
});
const Visitor = mongoose.model('Visitor', visitorSchema);
module.exports = Visitor;
