const express = require('express');

const router = express.Router();
//accessing the controller folder
const controllerIndex = require('../controller/index_controller');

//Router-Controller cycle
router.get('/', controllerIndex.home); //redirected to controller rendering home page
router.use('/users', require('./users')); //redirected to controller rendering localhost/users/... section

// console.log("Router folder working okay!!");

module.exports = router;