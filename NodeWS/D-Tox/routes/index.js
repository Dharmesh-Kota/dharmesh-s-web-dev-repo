const express = require('express');

const router = express.Router();
//accessing the controller folder
const controllerIndex = require('../controller/index_controller');

//Router-Controller cycle
router.get('/', controllerIndex.home);

// console.log("Router folder working okay!!");

module.exports = router;