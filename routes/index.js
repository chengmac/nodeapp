/*
 * @Author: chengmac 
 * @Date: 2018-10-14 14:56:24 
 * @Last Modified by: chengmac
 * @Last Modified time: 2020-11-11 21:50:57
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.jsonp({result: '欢迎访问'})
})

// 文章接口分发
// const upload = () => {
//     router.get('/getToken', controller.upload.getToken);
//     return router;
// }

module.exports = router;