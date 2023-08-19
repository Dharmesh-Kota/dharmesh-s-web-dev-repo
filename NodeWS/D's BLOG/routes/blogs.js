const express = require('express');
const router = express.Router();

const blogsController = require('../controller/blogs_controller');

router.get('/', blogsController.home);
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));
router.get('/zeller-congruence', blogsController.zeller);
router.get('/traffic-flow', blogsController.traffic);


module.exports = router;