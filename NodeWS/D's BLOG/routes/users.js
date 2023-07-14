const express = require('express');
const router = express.Router();

//accessing the controller folder
const userController = require('../controller/user_controller');

// Router-Controller cycle

router.get('/sign-in', userController.sign_in); //redirected to controller rendering sing-in page
router.get('/sign-up', userController.sign_up); //redirected to controller rendering sing-up page
router.post('/new-user', userController.new_user); //redirected to controller rendering localhost/users/... section
router.post('/create-session', userController.create_session); //redirected to controller rendering localhost/users/... section

module.exports = router;