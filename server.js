const express = require('express');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const routes = require('./routes/route');
const authController = require('./app/authController');
const moviesController = require('./app/moviesController');
const validateToken = require('./app/middleware').checkToken;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(routes);

app.use(cors);

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