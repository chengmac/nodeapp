/*
 * @Author: chengmac 
 * @Date: 2019-05-29 21:39:28 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-05-30 20:13:38
 */

const { handleError, handleSuccess } = require('../utils/handle');
const globalConfig = require('../config/global.config');
const qiniu = require('qiniu');
const uploadCtrl = {};

uploadCtrl.image = (req, res) => {
    const mac = new qiniu.auth.digest.Mac(globalConfig.QINIU.accessKey, globalConfig.QINIU.secretKey);
    const putPolicy = new qiniu.rs.PutPolicy(globalConfig.QINIU.options);
    const uploadToken = putPolicy.uploadToken(mac);
    let data = {
        putPolicy: putPolicy,
        uploadToken: uploadToken
    }
    handleSuccess({res, result: data, message: '获取成功'})
}
module.exports = uploadCtrl