const express = require('express');
const router = express.Router();
const passport = require('passport');


const controllerIndex = require('../controller/users_controller');

router.get('/signUp', controllerIndex.signUp);
router.get('/signIn', controllerIndex.signIn);
router.post('/createUser', controllerIndex.createUser);

router.get('/profile', passport.checkAuthentication, controllerIndex.profile);

// use passport as a middleware to authenticate the user
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/signIn'}
), controllerIndex.createSession);

router.get('/signOut', controllerIndex.clearSession);

module.exports = router;