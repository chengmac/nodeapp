/*
 * @Author: chengmac 
 * @Date: 2019-03-08 20:31:57 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-06-17 22:41:58
 */

const { handleError, handleSuccess } = require('../utils/handle');
const Classify = require('../models/classify.model');
const Label = require('../models/label.model');
const otherCtrl = {};

//  
otherCtrl.classify = (req, res) => {
    Classify.find().then(data => {
        if(data) {
            handleSuccess({res, result: data, message: '获取分类成功'});
        }
    })
}

otherCtrl.label = (req, res) => {
    Label.find().then(data => {
        if(data) {
            handleSuccess({res, result: data, message: '获取标签成功'});
        }
    })
}

// export
module.exports = otherCtrl