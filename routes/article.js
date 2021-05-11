const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');

router.get('/getArticleById', articleController.validate('getArticleById'), articleController.getArticleById);
router.get('/getAllArticle', articleController.validate('getAllArticle'), articleController.getAllArticle);
router.get('/getPublishArticle', articleController.validate('getPublishArticle'), articleController.getPublishArticle);
router.post('/save', articleController.validate('save'), articleController.save);

router.post('/deleteArticle', articleController.validate('deleteArticle'), articleController.deleteArticle);

router.post('/createCategory', articleController.validate('createCategory'), articleController.createCategory);

router.get('/categoryList', articleController.validate('categoryList'), articleController.categoryList);

router.post('/createLabel', articleController.validate('createLabel'), articleController.createLabel);

router.post('/deleteLabel', articleController.validate('deleteLabel'), articleController.deleteLabel);

router.get('/labelList', articleController.validate('labelList'), articleController.labelList);

router.post('/updateArticleStatus', articleController.validate('updateArticleStatus'), articleController.updateArticleStatus);
router.post('/updateArticle', articleController.validate('updateArticle'), articleController.updateArticle);
router.get('/search', articleController.validate('search'), articleController.search);

module.exports = router;
