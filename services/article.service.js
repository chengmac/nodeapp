const Article = require('../models/article.model');
const Logger = require('../utils/logger');
const Category = require('../models/category.model');
const Label = require('../models/label.model');
const Message = require('../models/message.model');
const _ = require('lodash');

class articleService {
    async save(body){
        Logger.info("articleService.save::", JSON.stringify(body))
        try {
            const article = await Article.create(body);
            Logger.info("articleService.save Db::", JSON.stringify(article))
            if(article) {
                // 保存一条新增记录
                await Message.create({name: body.title, content: '文章发布成功'});
                // 判断标签是否为多个
                if(body.label.length > 1) {
                    body.label.forEach(element => {
                        this.storageLabel(element, article);
                    });
                } else {
                    // 查找是否已存在的标签
                    this.storageLabel(body.label, article);
                }
                return {status: true, result: null , message : '发布成功'};
            } else {
                Logger.error("articleService.save error::", JSON.stringify(article))
                return {status: false, result: null, message: '发布失败!'};
            }
        } catch(err) {
            Logger.error("articleService.save::", JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }

    async storageLabel(element, article) {
        const label = await Label.find({name: element});
        if(label.length === 0) {
            await Label.create({name: element, articleId: article._id});
        } else {
            // 当标签相同时，存入对应文章id
            await Label.updateOne({name: element}, {$addToSet: {articleId: article._id}});
        }
    }

    async getAllArticle(query) {
        Logger.info("articleService.getAllArticle::", JSON.stringify(query));
        try {
            const { page, status } = query;
            const articleList = await Article.paginate({status: status}, page.options, {_id: 0});
            if(articleList) {
                let result = {
                    list: articleList.docs,
                    totalDocs: articleList.totalDocs,
                    totalPages: articleList.totalPages
                }
                return {status: true, result: result, message: '查询成功!'};
            }

        } catch(err) {
            Logger.error("articleService.getAllArticle::", JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }

    async createCategory(body) {
        Logger.info("articleService.createCategory::", JSON.stringify(body));
        try {
            const category = await Category.find({name: body.name}, {_id: 0});
            if(category != 0) {
                return {status: false, result: null, message: '该分类已经存在!'};
            } else {
                await Category.create(body);
                return {status: true, result: null, message: '创建成功!'};
            }
        } catch(err) {
            Logger.error("articleService.createCategory::", JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }

    async categoryList(body) {
        Logger.info("articleService.categoryList::", JSON.stringify(body));
        try {
            const category = await Category.find({}, {_id: 0});
            return {status: true, result: category, message: '查询成功!'};

        } catch(err) {
            Logger.error("articleService.categoryList::", JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }

    async createLabel(body) {
        Logger.info("articleService.createLabel::", JSON.stringify(body));
        try {
            const label = await Label.find({name: body.name}, {_id: 0});
            Logger.info("articleService.createLabel::", JSON.stringify(label));
            if(!label) {
                return {status: false, result: null, code: 200, message: '该标签已经存在!'};
            } else {
                await Label.create(body);
                return {status: true, result: null, message: '创建成功!'};
            }
        } catch(err) {
            Logger.error("articleService.createLabel::", JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }

    async labelList(body) {
        Logger.info("articleService.labelList::", JSON.stringify(body));
        try {
            const label = await Label.find({}, 'name', {_id: 0});
            return {status: true, result: label, message: '查询成功'};
        } catch(err) {
            Logger.error("articleService.labelList::", JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }

    async deleteLabel(body) {
        Logger.info("articleService.deleteLabel::", JSON.stringify(body));
        try {
            const label = await Label.deleteOne({"name": body.labelName});
            return {status: true, result: label, message: '删除成功'};
        } catch(err) {
            Logger.error("articleService.deleteLabel::", JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }

    async deleteArticle(body) {
        Logger.info("articleService.deleteArticle::", JSON.stringify(body));
        try {
            const article = await Article.deleteOne({articleId: body.articleId});
            return {status: true, result: article, message: '删除成功'};
        } catch(err) {
            Logger.error("articleService.deleteArticle::", JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }

    async updateArticleStatus(body) {
        Logger.info("articleService.updateArticleStatus::", JSON.stringify(body));
        try {
            const {articleId, status} = body;
            const article = await Article.update({articleId: articleId}, { status: status}, (err, raw) => {
                if(err) {
                    Logger.info("articleService.updateArticleStatus update::", JSON.stringify(err));
                }
            });
            return {status: true, result: article, message: '修改成功'};
        } catch(err) {
            Logger.error("articleService.updateArticleStatus::", JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }

    async getArticleById(query) {
        Logger.info("articleService.getArticleById::", JSON.stringify(query));
        try {
            const { articleId } = query;
            const article = await Article.findOne({articleId: articleId}, {_id: 0});
            return {status: true, result: article, message: '查询成功'};
        } catch(err) {
            Logger.error("articleService.getArticleById::", JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }

    async updateArticle(body) {
        Logger.info("articleService.updateArticle::", JSON.stringify(body));
        try {
            const article = await Article.findOneAndUpdate({articleId: body.articleId}, body);
            return {status: true, result: article, message: '更新成功'};
        } catch(err) {
            Logger.error("articleService.updateArticle::", JSON.stringify(err))
            return {status: false, result: err, message: '数据库错误!'};
        }
    }

    async search(query) {
        Logger.info("articleService.search::", JSON.stringify(query));
        try {
            let regexp=new RegExp(query.keywords, 'i');
            const search = await Article.find({$or:[
                {title:{$regex:regexp}},
                {subtitle:{$regex:regexp}},
                {category:{$regex:regexp}},
                {label:{$regex:regexp}}
            ]});
            return {status: true, result: search, message: '查询成功'};
        } catch(err) {
            Logger.error("articleService.search::", JSON.stringify(err))
            return {status: false, result: err, message: '数据库错误!'};
        }
    }

}

module.exports = new articleService();
