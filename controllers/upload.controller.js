/*
 * @Author: chengmac
 * @Date: 2019-05-29 21:39:28
 * @Last Modified by: chengmac
 * @Last Modified time: 2021-01-10 13:04:14
 */

const { handleSuccess, handleError } = require('../utils/handle');
const Logger = require('../utils/logger');
const uploadService = require('../services/upload.service');
const { body, validationResult } = require('express-validator');
const { ApiValidationError } = require('../utils/customError');

class uploadCtrl {
    async uploadImage(req, res, next) {
        Logger.info('uploadController.uploadImage::');
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new ApiValidationError(errors.array());
            }
            const result = await uploadService.uploadImage(req, res);
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
}

module.exports = new uploadCtrl();
