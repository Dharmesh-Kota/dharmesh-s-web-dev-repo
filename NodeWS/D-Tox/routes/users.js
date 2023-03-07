const express = require('express');

const router = express.Router();

const controllerIndex = require('../controller/users_controller');

router.get('/newuser', controllerIndex.newUser);
router.post('/signUp', controllerIndex.signUp);
router.post('/createSession', controllerIndex.createSession);

router.get('/profile', controllerIndex.profile);

module.exports = router;