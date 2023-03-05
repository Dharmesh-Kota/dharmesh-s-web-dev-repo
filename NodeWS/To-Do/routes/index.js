const express = require('express');

const router = express.Router();

const controllerIndex = require('../controller/index_controller');

router.get('/', controllerIndex.home);
router.use('/users', require('./users'));

module.exports = router;