/*
 * @Author: chengmac 
 * @Date: 2018-11-05 20:27:13 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-04-28 21:56:41
 */

const { handleRequest, handleError, handleSuccess } = require('../utils/handle');
const Message = require('../models/message.model');
const messageCtrl = {};

messageCtrl.getNews = (req, res) => {
    Message.find().then(data => {
        if(data) {
            handleSuccess({res, result: data, message: '获取成功'});
        }
    })
}

messageCtrl.updateNews = ({body}, res) => {
    Message.update({_id: body._id}, {isRead: body.isRead}, {multi: true}).then(data => {
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
    const controller = messageCtrl;
    handleRequest({ req, res, controller })
}