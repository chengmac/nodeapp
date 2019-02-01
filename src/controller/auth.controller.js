/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:59:43 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-02-01 22:23:10
 */

const { handleRequest, handleError, handleSuccess } = require('../utils/handle');
const Auth = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const config = require('../config');
const crypto = require('crypto');
const authCtrl = {};

// md5编码
const md5Decode = pwd => {
    return crypto.createHash('md5').update(pwd).digest('hex');
}

//获取个人信息
authCtrl.GET = (req, res) => {
    Auth.find({}, '-_id name slogan gravatar')
    .then(([result = {}]) => {
        handleSuccess({ res, result, message: '用户资料获取成功' });
    })
    .catch(err => {
        handleError({ res, err, message: '获取失败' });
    })
}

// 登陆口令Token的生成
authCtrl.POST = ({ body: { username, password }}, res) => {
    Auth.find({}, 'username password')
    .then((auth) => {
        // 产生token
        const token = jwt.sign({
            data: config.AUTH.data,
            // 设置token有效期为7天
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        }, config.AUTH.jwtTokenSecret);
        // 验证账户和密码
        if (Object.is(md5Decode(password), auth[0].password) && Object.is(username, auth[0].username)) {
            // 返回token
            handleSuccess({ res, result: { token }, message: '登陆成功' });
        } else {
            handleError({ res, message: '来者何人,报上名来!', code: 400 });
        }
        
    })
    .catch(err => {
        handleError({ res, err, message: '登录失败', code: 400 });
    })
}

// export
module.exports = (req, res) => { 
    const controller = authCtrl;
    handleRequest({ req, res, controller })
}