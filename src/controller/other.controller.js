/*
 * @Author: chengmac 
 * @Date: 2019-03-08 20:31:57 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-08 20:39:54
 */

const { handleRequest, handleError, handleSuccess } = require('../utils/handle');
const Classify = require('../models/classify.model');
const Label = require('../models/label.model');
const otherCtrl = {};

// 

// export
module.exports = (req, res) => { 
    const controller = otherCtrl;
    handleRequest({ req, res, controller })
}