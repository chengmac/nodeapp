/*
 * @Author: chengmac
 * @Date: 2019-03-08 20:31:57
 * @Last Modified by: chengmac
 * @Last Modified time: 2021-01-31 21:34:26
 */

const { handleError, handleSuccess } = require('../utils/handle');
const { validationResult } = require('express-validator');
const { ApiValidationError } = require('../utils/customError');
const Logger = require('../utils/logger');
const muiscService = require('../services/muisc.service');

class muiscCtrl {
    async getLikeMiuscList(req, res, next) {
        Logger.info('muiscController.getLikeMiuscList', JSON.stringify(req.query));
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new ApiValidationError(errors.array());
            }
            const result = await muiscService.getLikeMiuscList(req.query, req.cookies);
            if(result.cookies) {
                result.cookies.split(';;').map((item) => {
                    res.append('Set-Cookie', item);
                });
            }
            if(result.status) {
                handleSuccess({ res, result: result.body});
            } else {
                handleError({ res, code: 500, err: result.result });
            }
        } catch(err) {
            Logger.error('muiscController.getLikeMiuscList::', JSON.stringify(err.stack));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }

    async getMiuscDetail(req, res, next) {
        Logger.info('muiscController.getMiuscDetail', JSON.stringify(req.query));
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new ApiValidationError(errors.array());
            }
            const result = await muiscService.getMiuscDetail(req.query, req.cookies);
            if(result.status) {
                handleSuccess({ res, result: result});
            } else {
                handleError({ res, code: 500, err: result });
            }
        } catch(err) {
            Logger.error('muiscController.getMiuscDetail::', JSON.stringify(err.stack));
            handleError({ res, err, message: err.message, code: 400 });
            next(err);
        }
    }
}

// export
module.exports = new muiscCtrl();
