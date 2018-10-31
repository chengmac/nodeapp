/*
 * @Author: chengmac 
 * @Date: 2018-10-26 23:31:58 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-10-31 21:57:24
 */

const { handleRequest, handleError, handleSuccess } = require('../utils/handle');
const Article = require('../models/article.model');
const articleCtrl = {};

// 保存文章
articleCtrl.POST = ({body}, res) => {
    new Article(body).save()
    .then((docs) => {
        consola.ready("新账户和密码存储成功")
        if(docs) {
            // 返回token
            handleSuccess({ res, result: null, message: '保存成功' });
        }
    });
}

// 获取所有文章
articleCtrl.GET = ({body}, res) => {
    Article.find()
    .then((docs) => {
        consola.ready("查询成功");
        if(docs) {
            // 返回token
            handleSuccess({ res, result: docs, message: '查询成功' });
        }
    });
}

module.exports = (req, res) => { 
    const controller = articleCtrl;
    handleRequest({ req, res, controller })
};