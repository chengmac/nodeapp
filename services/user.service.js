const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const globalConfig = require('../config/global.config');
const crypto = require('crypto');
const Logger = require('../utils/logger');

class userService {
    constructor() {}
    // md5编码
    md5Decode(pwd) {
        return crypto.createHash('md5').update(pwd).digest('hex');
    }

    async login({username, password}) {
        Logger.info("userService.login::",JSON.stringify(username), JSON.stringify(password))
        try {
            const user = await User.find({}, 'username password');
            Logger.info("userService.login DB::",JSON.stringify(user))
            // 产生token
            const token = jwt.sign({
                data: {
                    name: username,
                    accountRole: username === globalConfig.AUTH.defaultUsername ? 'admin' : 'user', //默认用户为admin
                    loginTime: Date.now()
                },
                // 设置token有效期为7天
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
            }, globalConfig.AUTH.jwtTokenSecret);
            // 判断登录账户是否已存在数据库中
            if(user.length !== 0) {
                // 验证账户和密码
                if (Object.is(this.md5Decode(password), user[0].password) && Object.is(username, user[0].username)) {
                    // 返回token
                    return {status: true, result: {token}, message : '登陆成功'};
                } else {
                    return {status: false, result: null, message: '来者何人,报上名来!'};
                }
            } else {
                if(!Object.is(password, globalConfig.AUTH.defaultPassword) && Object.is(username, globalConfig.AUTH.defaultUsername)) {
                    return {status: false, result: null, message: '来者何人,报上名来!'};
                }
                const create = await User.create({username: username, password: this.md5Decode(password)});
                if(create.length !== 0) {
                    Logger.info(username + '用户创建成功');
                    return {status: true, result: {token}, message : '登陆成功'};
                } else {
                    Logger.error(username + '用户创建失败');
                    return {status: false, result: null, message: '来者何人,报上名来!'};
                }
            }
        } catch(err) {
            Logger.error("userService.login::",JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }
}


module.exports = new userService();
