const express = require('express');
const router = express.Router();
const authController = require('../app/authController');
const moviesController = require('../app/moviesController');
const validateToken = require('../app/middleware').checkToken;


// Users Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user/:id', authController.getUser);

// Plans routes
router.get('movies', validateToken, moviesController.getMovies);
router.post('movie/add', validateToken, moviesController.newMovie);
router.put('/movie/edit/:id', validateToken, moviesController.editMovie);
router.delete('/movie/delete/:id', validateToken, moviesController.deleteMovie);

module.exports = router;