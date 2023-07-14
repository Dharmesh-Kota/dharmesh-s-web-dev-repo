const express = require('express');
const router = express.Router();

//accessing the controller folder
const homeController = require('../controller/home_controller');

// Router-Controller cycle
router.get('/', homeController.home); //redirected to controller rendering home page
router.use('/users', require('./users')); //redirected to controller rendering localhost/users/... section


module.exports = router;