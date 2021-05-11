const { getClientIP } = require('../utils');
const Logger = require('../utils/logger');
const Axios = require('axios');
const globalConfig = require('../config/global.config');
const userAgent = require('ua-parser-js');
const Visitor = require('../models/visitor.model');

class visitorService {
    async getVisitorIp(req) {
        Logger.info("visitorService.getVisitorIp::");
        try {
            let currentIp = getClientIP(req);
            let location = await this.getVisitorLocation(currentIp);
            let ua = new userAgent(req.headers['user-agent']).getResult();

            const visitor = await Visitor.find({ip: currentIp}, {_id: 0});
            if(visitor.length === 0) {
                let visitorData = {
                    ip: currentIp,
                    city: location.data.content.address_detail.city,
                    os: ua.os.name,
                    osVersion: ua.os.version,
                    browser: ua.browser.name,
                    browserVersion: ua.browser.version
                }
                if(location.data.status === 0) {
                    visitorData = Object.assign(visitorData, {
                        city: location.data.content.address_detail.city,
                        province: location.data.content.address_detail.province,
                    })
                }
                Logger.info("articleService.visitorData::", JSON.stringify(visitorData))
                await Visitor.create(visitorData);
            }
        } catch (err) {
            Logger.error("articleService.getVisitorIp::", JSON.stringify(err.stack))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }
    async getVisitorLocation(ip) {
        Logger.info("visitorService.getVisitorLocation::", ip);
        try {
            return await Axios({
                method: 'GET',
                url: `${globalConfig.BAIDU.url}?ip=${ip}&ak=${globalConfig.BAIDU.ak}`,
            });

        } catch (err) {
            Logger.error("articleService.getVisitorLocation::", JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }
}
module.exports = new visitorService();
