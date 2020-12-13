/*
 * @Author: chengmac 
 * @Date: 2019-05-29 21:39:28 
 * @Last Modified by: chengmac
 * @Last Modified time: 2020-12-13 15:32:03
 */

const { handleSuccess, handleError } = require('../utils/handle');
const Logger = require('../utils/logger');
const uploadService = require('../services/upload.service');
const { body, validationResult } = require('express-validator');

class uploadCtrl {
    async uploadImage(req, res, next) {
        Logger.info('uploadController.uploadImage::');
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new Error(errors.array()[0].msg);
            }
            const result = await uploadService.uploadImage(req.body, res);
            Logger.info('uploadController.uploadImage uploadImage ::', JSON.stringify(result));
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('uploadController.uploadImage::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }

    // 验证req
    validate(method) {
        switch(method) {
            case 'uploadImage': return [body('base64', 'base64不能为空').notEmpty()];
        }
    }
}

module.exports = new uploadCtrl();