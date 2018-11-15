/*
 * @Author: chengmac 
 * @Date: 2018-10-26 23:31:58 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-11-15 22:36:57
 */

const { handleRequest, handleError, handleSuccess } = require('../utils/handle');
const Article = require('../models/article.model');
const News = require('../models/news.model');
const articleCtrl = {};

// 保存文章
articleCtrl.POST = ({body}, res) => {
    Article(body).save()
    .then(docs => {
        consola.ready("发布成功")
        if(docs) {
            // 保存一条新增记录
            new News({name: body.title, content: '文章发布成功'}).save();
            handleSuccess({ res, result: null, message: '发布成功' });
        }
    })
    .catch(err => {
        handleError({res, err, message: '发布失败', code: 400});
    });
}

// 获取所有文章
articleCtrl.GET = (req, res) => {
    const { page, limit } = req.query;
    const options = {page};
    Article.paginate({}, options)
    .then(docs => {
        consola.ready("查询成功");
        if(docs) {
            handleSuccess({ res, result: docs, message: '查询成功' });
        }
    })
    .catch(err => {
        handleError({res, err, message: '查询失败', code: 400});
    });
}

// 删除某一个文章
articleCtrl.DELETE = ({body}, res) => {
    new Article(body).remove()
    .then(docs => {
        consola.ready("删除成功");
        if(docs) {
            // 保存一条删除记录
            new News({name: body.title, content: '文章删除成功'}).save();
            handleSuccess({ res, result: docs, message: '删除成功' });
        }
    })
    .catch(err => {
        handleError({res, err, message: '删除失败', code: 400});
    });
}

module.exports = (req, res) => { 
    const controller = articleCtrl;
    handleRequest({ req, res, controller })
};