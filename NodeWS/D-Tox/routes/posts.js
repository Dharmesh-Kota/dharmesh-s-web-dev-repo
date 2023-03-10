const express = require('express');
const router = express.Router();
const passport = require('../config/passport-strategy-local');

const controllerIndex = require('../controller/posts_controller');

router.post('/create', passport.checkAuthentication,controllerIndex.create);

module.exports = router;