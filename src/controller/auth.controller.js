/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:59:43 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-05-30 20:13:11
 */
const { handleError, handleSuccess } = require('../utils/handle');
const Auth = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const globalConfig = require('../config/global.config');
const crypto = require('crypto');
const authCtrl = {};

// md5编码
const md5Decode = pwd => {
    return crypto.createHash('md5').update(pwd).digest('hex');
}

// 登陆口令Token的生成
authCtrl.login = ({ body: { username, password }}, res) => {
    Auth.find({}, 'username password').then((auth) => {
        // 产生token
        const token = jwt.sign({
            data: {
                name: username,
                admin: username === globalConfig.AUTH.defaultUsername ? true : false //默认用户为admin
            },
            // 设置token有效期为7天
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        }, globalConfig.AUTH.jwtTokenSecret);
        // 判断登录账户是否已存在数据库中
        if(auth.length !== 0) {
            // 验证账户和密码
            if (Object.is(md5Decode(password), auth[0].password) && Object.is(username, auth[0].username)) {
                // 返回token
                handleSuccess({ res, result: { token }, message: '登陆成功' });
            } else {
                handleError({ res, message: '来者何人,报上名来!', code: 400 });
            }
        } 
        // else {
        //     Auth.create({username: username, password: md5Decode(password)}).then((create, err) => {
        //         if(create.length !== 0) {
        //             Logger.getLogger().info(username + '用户创建成功');
        //             handleSuccess({ res, result: { token }, message: '登陆成功' });
        //         } else {
        //             Logger.getLogger('err').err(username + '用户创建失败');
        //             handleError({ res, err, message: '登录失败', code: 400 });
        //         }
        //     });
        // }
        
    })
    .catch(err => {
        handleError({ res, err, message: '登录失败', code: 400 });
    })
}

// export
module.exports = authCtrl