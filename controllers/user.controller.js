/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:59:43 
 * @Last Modified by: chengmac
 * @Last Modified time: 2020-11-15 21:10:13
 */
const { handleError, handleSuccess } = require('../utils/handle');
const { body, validationResult } = require('express-validator');
const Logger = require('../utils/logger');
const UserService = require('../services/user.service');

class userCtrl {
    constructor() {}

    // 登陆口令Token的生成
    async login(req, res, next) {
        Logger.info('userController.login::', JSON.stringify(req.body));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new Error(errors.array()[0].msg);
            }
            const result = await UserService.login(req.body);
            Logger.info('userController.login error::', JSON.stringify(result));
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('userController.login::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next();
        }
    }
    // 验证req
    validate(method) {
        switch(method) {
            case 'login': return [body('username', 'username不能为空').notEmpty(), body('password', 'password不能为空').notEmpty()];
        }
    }
}

// export
module.exports = new userCtrl();