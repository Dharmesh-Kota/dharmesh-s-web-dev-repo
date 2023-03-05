const express = require('express');

const router = express.Router();

const controllerIndex = require('../controller/index_controller');

router.post('/sendData', controllerIndex.sendData);

module.exports = router;