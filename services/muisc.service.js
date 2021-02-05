const crypto = require('crypto');
const Logger = require('../utils/logger');
const externalRequest = require('../utils/externalRequest');
const { cookieToJson } = require('../utils');
const globalConfig = require('../config/global.config');
const _ = require('lodash');

class muiscService {
    async loginTo163Miusc(query) {
        Logger.info("muiscService.login::", query)
        try {
            let cookie = {os: 'pc'};
            const data = {
                username: query.email,
                password:
                  crypto.createHash('md5').update(query.password).digest('hex'),
                rememberLogin: 'true',
            }
            let result = await externalRequest(
                'POST',
                `https://music.163.com/weapi/login`,
                data,
                {
                  crypto: 'weapi',
                  ua: 'pc',
                  cookie: cookie,
                  proxy: query.proxy,
                  realIP: query.realIP
                },
              );
            Logger.info("muiscService.login::", JSON.stringify(result))

            if (result.body.code === 200) {
                result = {
                    status: 200,
                    body: {
                    ...result.body,
                    cookie: result.cookie.join(';'),
                    },
                    cookie: result.cookie,
                }
            }
            return result;
        } catch(err) {
            Logger.error("muiscService.login::",JSON.stringify(err))
            return {status: false, result: err, message: '连接网易云错误!'};
        }
    }

    async getLikeMiuscList(query, cookies) {
        Logger.info("muiscService.getLikeMiuscList::", query, cookies);
        try {
            let data = null, user = null;
            if(_.isEmpty(query) || _.isEmpty(cookies)) {
                user = await this.loginTo163Miusc({
                    email: globalConfig.MUISC.username,
                    password: globalConfig.MUISC.password
                });
                data = {
                    uid: user.body.account.id
                }
                cookies = user.body.cookie;
            } else {
                data = {
                    uid: query.id
                }
            }
            let result = await externalRequest(
                'POST',
                `https://music.163.com/weapi/song/like/get`,
                data,
                {
                    crypto: 'weapi',
                    cookie: cookies,
                    proxy: query.proxy,
                    realIP: query.realIP,
                },
            );
            if(user && user.body.cookie) {
                result.cookies = user.body.cookie;
                result.body.uid = user.body.account.id;
            }
            return result;
        } catch(err) {
            Logger.error("muiscService.getLikeMiuscList::",JSON.stringify(err))
            return {status: false, result: err, message: '连接网易云错误!'};
        }
    }

    async getMiuscUrl(query, cookies) {
        Logger.info("muiscService.getMiuscUrl::", query);
        try {
            if (!('MUSIC_U' in cookies))
            cookies._ntes_nuid = crypto.randomBytes(16).toString('hex')
            cookies.os = 'pc'
            const data = {
                ids: '[' + query.id + ']',
                br: parseInt(query.br || 999000),
            }
            let result = await externalRequest(
                'POST',
                `https://interface3.music.163.com/eapi/song/enhance/player/url`,
                data,
                {
                    crypto: 'eapi',
                    cookie: cookies,
                    proxy: query.proxy,
                    realIP: query.realIP,
                    url: '/api/song/enhance/player/url'
                }
            );
            return result;
        } catch(err) {
            Logger.error("muiscService.getMiuscUrl::",JSON.stringify(err))
            return {status: false, result: err, message: '连接网易云错误!'};
        }
    }

    async getMiuscName(query, cookies) {
        Logger.info("muiscService.getMiuscName::", query);
        try {
            query.ids = query.ids.split(/\s*,\s*/);
            const data = {
                c: '[' + query.ids.map((id) => '{"id":' + id + '}').join(',') + ']',
                ids: '[' + query.ids.join(',') + ']',
            }
            let result = await externalRequest(
                'POST',
                `https://music.163.com/weapi/v3/song/detail`,
                data,
                {
                    crypto: 'weapi',
                    cookie: cookies,
                    proxy: query.proxy,
                    realIP: query.realIP
                }
            );
            return result;
        } catch(err) {
            Logger.error("muiscService.getMiuscName::",JSON.stringify(err))
            return {status: false, result: err, message: '连接网易云错误!'};
        }
    }

    async getMiuscDetail(query, cookies) {
        Logger.info("muiscService.getMiuscDetail::", query, cookies);
        try {
            let result = {};
            const muiscUrl = await this.getMiuscUrl(query, cookies);
            const muiscDetail = await this.getMiuscName({ids: query.id}, cookies);
            if(muiscUrl && muiscDetail) {
                result.status = true;
                result.body = {
                    id: muiscUrl.body.data[0].id,
                    resourceUrl: muiscUrl.body.data[0].url,
                    coverImgUrl: muiscDetail.body.songs[0].al.picUrl,
                    name: muiscDetail.body.songs[0].name,
                    author: muiscDetail.body.songs[0].ar[0].name
                }
            }
            return result;
        } catch(err) {
            Logger.error("muiscService.getMiuscDetail::",JSON.stringify(err.stack))
            return {status: false, result: err, message: '连接网易云错误!'};
        }
    }
}


module.exports = new muiscService();
