/*
 * @Author: chengmac 
 * @Date: 2018-10-26 23:31:58 
 * @Last Modified by: chengmac
 * @Last Modified time: 2020-11-16 00:38:41
 */

const { handleError, handleSuccess } = require('../utils/handle');
const Article = require('../models/article.model');
const ArticleService = require('../services/article.service');
const { body, query ,validationResult } = require('express-validator');
const Logger = require('../utils/logger');

class articleCtrl { 
    // 保存文章
    async save(req, res, next) {
        Logger.info('articleController.save::', JSON.stringify(req.body));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new Error(errors.array()[0].msg);
            }
            const result = await ArticleService.save(req.body);
            Logger.info('articleController.save error::', JSON.stringify(result));
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.save::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next();
        }
    }

    // 获取单个文章
    single(req, res) {
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
    async getAll(req, res, next) {
        Logger.info('articleController.getAll::', JSON.stringify(req.query));
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                throw new Error(errors.array()[0].msg);
            }
            const result = await ArticleService.getAll(req.query);
            Logger.info('articleController.getAll error::', JSON.stringify(result));
            if(result.status) {
                handleSuccess({ res, ...result});
            } else {
                handleError({ res, code: 400, ...result });
            }
        } catch(err) {
            Logger.error('articleController.getAll::', JSON.stringify(err));
            handleError({ res, err, message: err.message, code: 400 });
            next();
        }
    }
    // 获取所有已发布文章
    getReleased(req, res) {
        const { page} = req.query;
        const options = {page};
        Article.paginate({release: true}, options).then(docs => {
            if(docs) {
                handleSuccess({ res, result: docs, message: '查询成功' });
            }
        })
        .catch(err => {
            handleError({res, err, message: '查询失败', code: 400});
        });
    }

    batchDelete({body}, res) {
        Article.deleteMany({_id: {$in: body._id}}).then(docs => {
            if(docs) {
                handleSuccess({ res, result: docs, message: '删除成功' });
            }
        })
        .catch(err => {
            handleError({res, err, message: '删除失败', code: 400});
        });
    }

    // 验证req
    validate(method) {
        switch(method) {
            case 'save': return [
                body('title', 'title不能为空').notEmpty(), 
                body('category', 'category不能为空').notEmpty(),
                body('label', 'label不能为空').notEmpty(),
                body('type', 'type不能为空').notEmpty(),
                body('content', 'content不能为空').notEmpty(),
                body('private', 'private不能为空').notEmpty(),
                body('heroImage', 'heroImage不能为空').notEmpty(),
                body('status', 'status不能为空').notEmpty(),
            ];
            case 'getAll': return [
                query('page', 'page不能为空').notEmpty(), 
                query('pageSize', 'pageSize不能为空').notEmpty()
            ];
        }
    }
}


// 批量删除文章

module.exports = new articleCtrl();