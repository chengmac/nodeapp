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
                // 查找是否已存在的分类
                const category = await Category.find({name: body.category});
                
                if(category.length === 0) {
                    await Category.create({name: body.category, articleId: article._id});
                } else {
                    // 当分类相同时，存入对应文章id
                    await Category.updateOne({name: article.category}, {$addToSet: {articleId: article._id}});
                }
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

    async getAll(query) {
        Logger.info("articleService.getAll::", JSON.stringify(query));
        try {
            const { page } = query;
            const allArticle = await Article.paginate({}, page.options);
            if(allArticle) {
                return {status: true, result: _.cloneDeep(allArticle), message: '查询成功!'};
            }
            
        } catch(err) {
            Logger.error("articleService.getAll::", JSON.stringify(err))
            return {status: false, result: null, message: '数据库错误!'};
        }
    }

}

module.exports = new articleService();