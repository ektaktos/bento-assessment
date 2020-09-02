const express = require('express');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/route');
const authController = require('./app/authController');
const moviesController = require('./app/moviesController');
const validateToken = require('./app/middleware').checkToken;

// app.get('/', (req, res) => res.send('Hello World!'));
// Users Routes
app.get('/', authController.test);
app.post('/register', authController.register);
app.post('/login', authController.login);
app.get('/user/:id', authController.getUser);

// Plans routes
app.get('movies', validateToken, moviesController.getMovies);
app.post('movie/add', validateToken, moviesController.newMovie);
app.put('/movie/edit/:id', validateToken, moviesController.editMovie);
app.delete('/movie/delete/:id', validateToken, moviesController.deleteMovie);
// app.use('',routes);

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(config.db_url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) {
      console.log('Hollo');
      return console.log(err);
  } else {
      console.log('Hello');
  }
});

app.listen(config.port, ()=>{
  console.log('Server started');
});