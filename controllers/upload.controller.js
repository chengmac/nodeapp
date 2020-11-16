/*
 * @Author: chengmac 
 * @Date: 2019-05-29 21:39:28 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-08-01 21:48:05
 */

const { handleSuccess } = require('../utils/handle');
const globalConfig = require('../config/global.config');
const qiniu = require('qiniu');
const uploadCtrl = {};



uploadCtrl.getToken = (req, res) => {
    const mac = new qiniu.auth.digest.Mac(globalConfig.QINIU.keys.accessKey, globalConfig.QINIU.keys.secretKey);
    const putPolicy = new qiniu.rs.PutPolicy(globalConfig.QINIU.options);
    const uploadToken = putPolicy.uploadToken(mac);
    let data = {
        uploadToken: uploadToken
    }
    handleSuccess({res, result: data, message: '获取成功'})
}
module.exports = uploadCtrl