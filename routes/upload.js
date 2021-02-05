const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const storage = multer.diskStorage({
    //存储的位置
    destination(req, file, cb){
        cb(null, './images/');
    },
    //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
    filename(req, file, cb){
        cb(null, file.originalname.split('.')[0] + '_' + uuidv4(file.originalname.split('.')[0]) + '.' + file.originalname.split('.')[1])
    }
})
// const upload = multer({dest: 'images/'});
const upload = multer({storage: storage});

router.post('/image', upload.single('file'), uploadController.uploadImage);

module.exports = router;
