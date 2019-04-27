/*
 * @Author: chengmac 
 * @Date: 2018-10-26 23:31:58 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-31 13:09:22
 */

const { handleRequest, handleError, handleSuccess } = require('../utils/handle');
const Article = require('../models/article.model');
const News = require('../models/news.model');
const Classify = require('../models/classify.model');
const Label = require('../models/label.model');
const articleCtrl = {};

// 保存文章
articleCtrl.articleSave = ({body}, res) => {
    Article.create(body).then(docs => {
        if(docs) {
            // 保存一条新增记录
            News.create({name: body.title, content: '文章发布成功'});
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
                            });;
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
articleCtrl.article = (req, res) => {
    const { id } = req.query;
    Article.findById(id).then(docs => {
        if(docs) {
            handleSuccess({ res, result: docs, message: '查询成功' });
        }
    })
    .catch(err => {
        handleError({res, err, message: '查询失败', code: 400});
    });
}

// 获取所有文章
articleCtrl.articleList = (req, res) => {
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

// 删除某一个文章
articleCtrl.articleDelete = ({body}, res) => {
    body._id.map(id => {
        Article.deleteOne({_id: id}).then(docs => {
            if(docs) {
                // 保存一条删除记录
                News.create({name: body.title, content: '文章删除成功'});
                handleSuccess({ res, result: docs, message: '删除成功' });
            }
        })
        .catch(err => {
            handleError({res, err, message: '删除失败', code: 400});
        });
    })
}

articleCtrl.getArticleAllClassify = (req, res) => {
    Classify.find().then(data => {
        if(data) {
            handleSuccess({res, result: data, message: '获取分类成功'});
        }
    })
}

articleCtrl.getArticleAllLabel = (req, res) => {
    Label.find().then(data => {
        if(data) {
            handleSuccess({res, result: data, message: '获取标签成功'});
        }
    })
}

module.exports = (req, res) => {
    const controller = articleCtrl;
    handleRequest({ req, res, controller })
};