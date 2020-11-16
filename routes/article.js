const express = require('express');
const router = express.Router();
const controller = require('../controllers/article.controller');


router.get('/single', controller.single);
router.get('/getAll', controller.getAll);
router.get('/getReleased', controller.getReleased);
// router.get('/classify', controller.classify);
// router.get('/label', controller.label);
router.post('/save', controller.save);
router.delete('/batchDelete', controller.batchDelete);

module.exports = router;