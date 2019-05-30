/*
 * @Author: chengmac 
 * @Date: 2018-11-05 20:27:13 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-05-30 21:17:24
 */

const { handleError, handleSuccess } = require('../utils/handle');
const Message = require('../models/message.model');
const messageCtrl = {};

messageCtrl.get = (req, res) => {
    console.log(req)
    Message.find({}).then(data => {
        if(data) {
            handleSuccess({res, result: data, message: '获取成功'});
        }
    })
}

messageCtrl.update = ({body}, res) => {
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
module.exports = messageCtrl