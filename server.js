const express = require('express');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/route');

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

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