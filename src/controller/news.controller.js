/*
 * @Author: chengmac 
 * @Date: 2018-11-05 20:27:13 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-03 18:04:18
 */

const { handleRequest, handleError, handleSuccess } = require('../utils/handle');
const News = require('../models/news.model');
const newsCtrl = {};

newsCtrl.getNews = (req, res) => {
    News.find().then(data => {
        if(data) {
            handleSuccess({res, result: data, message: '获取成功'});
        }
    })
}

newsCtrl.updateNews = ({body}, res) => {
    News.update({_id: body._id}, {isRead: body.isRead}, {multi: true}).then(data => {
        if(data) {
            handleSuccess({res, result: data, message: '消息更新成功'});
        }
    })
    .catch(err => {
        handleSuccess({res, err, message: '消息更新成功', code: 400});
    })
}

// export
module.exports = (req, res) => { 
    const controller = newsCtrl;
    handleRequest({ req, res, controller })
}