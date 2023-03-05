const express = require('express');

const router = express.Router();

const controllerUsers = require('../controller/users_controller'); //accessing the corresponding controller file

router.get('/profile', controllerUsers.profile);
router.get('/data', controllerUsers.data);
router.post('/dataPost', controllerUsers.dataPost);


module.exports = router;