const express = require('express');
const router = express.Router();

const mailController = require('../controller/mail_controller');

router.post('/query', mailController.query);

module.exports = router;