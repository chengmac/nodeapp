/*
 * @Author: chengmac 
 * @Date: 2018-10-26 23:31:58 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-05-30 22:06:38
 */

const { handleError, handleSuccess } = require('../utils/handle');
const Article = require('../models/article.model');
const Message = require('../models/message.model');
const Classify = require('../models/classify.model');
const Label = require('../models/label.model');
const articleCtrl = {};

// 保存文章
articleCtrl.save = ({body}, res) => {
    Article.create(body).then(docs => {
        if(docs) {
            // 保存一条新增记录
            Message.create({name: body.title, content: '文章发布成功'});
            // 查找是否已存在的分类
            Classify.find({name: body.classify}).then(query => {
                if(query.length === 0) {
                    Classify.create({name: body.classify, articleId: docs._id});
                } else {
                    // 当分类相同时，存入对应文章id
                    Classify.updateOne({name: docs.classify}, {$addToSet: {articleId: docs._id}}).then(success => {
                        console.log(success)
                    });
                }
            });
            // 判断标签是否为多个
            if(body.label.length > 1) {
                body.label.forEach(element => {
                    Label.find({name: element}).then(query => {
                        if(query.length === 0) {
                            Label.create({name: element, articleId: docs._id});
                        } else {
                            // 当标签相同时，存入对应文章id
                            Label.updateOne({name: element}, {$addToSet: {articleId: docs._id}}).then(success => {
                                console.log(success)
                            });
                        }
                    });
                });
            } else {
                // 查找是否已存在的标签
                Label.find({name: body.label}).then(query => {
                    if(query.length === 0) {
                        Label.create({name: body.label, articleId: docs._id});
                    } else {
                        // 当标签相同时，存入对应文章id
                        Label.updateOne({name: docs.label}, {$addToSet: {articleId: docs._id}});
                    }
                });
            }
            handleSuccess({ res, result: null, message: '发布成功' });
        }
    })
    .catch(err => {
        handleError({res, err, message: '发布失败', code: 400});
    });
}

// 获取单个文章
articleCtrl.id = (req, res) => {
    console.log(req.params.id)
    Article.findById(req.params.id).then(docs => {
        if(docs) {
            handleSuccess({ res, result: docs, message: '查询成功' });
        }
    })
    .catch(err => {
        handleError({res, err, message: '查询失败', code: 400});
    });
}

// 获取所有文章
articleCtrl.list = (req, res) => {
    const { page } = req.query;
    const options = {page};
    Article.paginate({}, options).then(docs => {
        if(docs) {
            handleSuccess({ res, result: docs, message: '查询成功' });
        }
    })
    .catch(err => {
        handleError({res, err, message: '查询失败', code: 400});
    });
}

// 批量删除文章
articleCtrl.batchDelete = ({body}, res) => {
    Article.deleteMany({_id: {$in: body._id}}).then(docs => {
        if(docs) {
            handleSuccess({ res, result: docs, message: '删除成功' });
        }
    })
    .catch(err => {
        handleError({res, err, message: '删除失败', code: 400});
    });
}

module.exports = articleCtrl