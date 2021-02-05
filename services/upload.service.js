const Logger = require('../utils/logger');
const globalConfig = require('../config/global.config');
const qiniu = require('qiniu');
const CONSTANTS = require('../utils/constant');
const fs = require('fs');

class uploadService {
    getQiNiuToken() {
        const mac = new qiniu.auth.digest.Mac(globalConfig.QINIU.keys.accessKey, globalConfig.QINIU.keys.secretKey);
        const putPolicy = new qiniu.rs.PutPolicy(globalConfig.QINIU.options);
        const uploadToken = putPolicy.uploadToken(mac);
        return uploadToken;
    }

    /**
     *
     *
     * @param {*} fileName
     * @param {*} filePath
     * @memberof uploadService
     */
    async uploadToQiNiu(fileName, filePath) {
        let uploadToken = this.getQiNiuToken();
        let config = new qiniu.conf.Config();
        //空间对应的机房
        config.zone = qiniu.zone.Zone_z1;
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();
        return new Promise((resolve, reject) => {
            formUploader.putFile(uploadToken, fileName, filePath, putExtra, (respErr,
            respBody, respInfo) => {
                if (respErr) {
                    Logger.error("userService.uploadToQiNiu::",JSON.stringify(respErr))
                    reject(respErr);
                }
                if (respInfo.statusCode == 200) {
                    resolve(respBody);
                } else {
                    reject(respBody);
                }
            })

        })
    }

    async uploadImage(req) {
        Logger.info("uploadService.uploadImage::", JSON.stringify(req.file))
        try {
            let fileName = req.file.filename;
            let filePath = `./images/${fileName}`;
            const result = await this.uploadToQiNiu(fileName, filePath);
            Logger.info("uploadService.uploadImage::  ------>", JSON.stringify(result))
            // 上传之后删除本地文件
            fs.unlinkSync(filePath);
            let imageupload = {imageUrl: `${CONSTANTS.QINIUYUN_DOMAIN}/${result.key}`}
            return {status: true, result: imageupload, message : '上传成功'};
        } catch(err) {
            Logger.error("userService.uploadImage::",JSON.stringify(err))
            return {status: false, result: null, message: '错误!'};
        }
    }
}


module.exports = new uploadService();
