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
    async uploadImage({base64}) {
        Logger.info("uploadService.uploadImage::")
        try {
            base64 = base64.replace(/^data:image\/\w+;base64,/, "");
            let dataBuffer = new Buffer(base64, 'base64');
            let fileName = Date.now() + '.png';
            let filePath = `./images/${fileName}`;
            let uploadToken = this.getQiNiuToken();
            await fs.writeFile(filePath, dataBuffer, (err) => {
                if(err) {
                    Logger.info("uploadService.uploadImage::", JSON.stringify(err))
                    return {status: false, result: null, message: '本地存储错误!'};
                }
            }); 
            let config = new qiniu.conf.Config();
            //空间对应的机房
            config.zone = qiniu.zone.Zone_z1;
            const formUploader = new qiniu.form_up.FormUploader(config);
            const putExtra = new qiniu.form_up.PutExtra();
            formUploader.putFile(uploadToken, fileName, filePath, putExtra, (respErr,
            respBody, respInfo) => {
                if (respErr) {
                    Logger.error("userService.uploadImage::",JSON.stringify(respErr))
                    throw respErr;
                }
                if (respInfo.statusCode == 200) {
                    console.log(respBody);
                    // 上传之后删除本地文件
                    fs.unlinkSync(filePath);     
                    // return Promise.resolve(respBody);
                } else {
                    console.log(respBody);
                }
            })
            
            let imageupload = {imageUrl: `${CONSTANTS.QINIUYUN_DOMAIN}/${fileName}`}
            return {status: true, result: imageupload, message : '上传成功'};
        } catch(err) {
            Logger.error("userService.uploadImage::",JSON.stringify(err))
            return {status: false, result: null, message: '错误!'};
        }
    }
}


module.exports = new uploadService();