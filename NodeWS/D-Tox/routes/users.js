const express = require('express');

const router = express.Router();

const controllerIndex = require('../controller/users_controller');

router.get('/newuser', controllerIndex.newUser);

module.exports = router;