/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:56:24 
 * @Last Modified by: chengmac
 * @Last Modified time: 2020-11-18 22:28:35
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/upload.controller');

router.get('/', (req, res, next) => {
    res.jsonp({result: '欢迎访问'})
    next();
})

// 文章接口分发
// router.get('/api/getQiNiuToken', controller.getQiNiuToken);


module.exports = router;