const express = require('express');
const router = express.Router();
const controller = require('../controllers/message.controller');


router.get('/', controller.get);
router.put('/update', controller.update);

module.exports = router;