const express = require('express');
const router = express.Router();
const muiscController = require('../controllers/muisc.controller');

router.get('/getLikeMiuscList', muiscController.getLikeMiuscList);
router.get('/getMiuscDetail', muiscController.getMiuscDetail);

module.exports = router;
