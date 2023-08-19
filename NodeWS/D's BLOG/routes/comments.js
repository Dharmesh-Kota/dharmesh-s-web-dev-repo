const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

const commentsController = require('../controller/comments_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);
router.get('/destroy', passport.checkAuthentication, commentsController.destroy);

module.exports = router;