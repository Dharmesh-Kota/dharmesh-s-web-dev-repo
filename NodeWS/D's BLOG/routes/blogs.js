const express = require('express');
const router = express.Router();

const blogsController = require('../controller/blogs_controller');

router.get('/', blogsController.home);

module.exports = router;