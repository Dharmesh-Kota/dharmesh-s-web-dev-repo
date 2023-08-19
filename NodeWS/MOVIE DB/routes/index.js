const express = require('express');
const router = express.Router();

//accessing the controller folder
const homeController = require('../controller/home_controller');

// Router-Controller cycle
router.get('/', homeController.home); //redirected to controller rendering home page
router.get('/add-page', homeController.add_movie_page);
router.get('/movie/:id', homeController.movie);
router.post('/add-movie', homeController.add_movie);

module.exports = router;
