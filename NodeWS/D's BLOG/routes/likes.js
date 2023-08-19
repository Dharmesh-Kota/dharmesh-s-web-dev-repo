const express = require('express');
const router = express.Router();

const likesController = require('../controller/likes_controller');

router.use('/up/:topic', likesController.up_vote);
router.use('/down/:topic', likesController.down_vote);

module.exports = router;