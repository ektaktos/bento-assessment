const axios = require('axios');
const config = require('../config');
const model = require('../models/model');
const Movie = model.moviesModel;

// Function to generate plan ID
async function generateId() {
  var id = Math.random().toString(36).substr(2, 6);
  var valid = await Movie.findOne({ movie_id: id });
  if (valid !== null) {
      generateId();
  } else {
      return id;
  }
}

exports.getMovies = async function(req, res){
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${config.moviedb_key}`;
  try {
    const response = await axios.get(url);
    res.status(200).json({ status: 'success', data: response });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error });
  }
}

exports.newMovie = async function(req, res){
  const movie_id = await generateId();
  let movie = new Movie({
    movie_id,
    user_email: req.decoded.email,
    movie_title: req.body.movie_title,
    movie_rating: req.body.movie_rating
  })

  movie.save(function(err, movie){
    if (err) {
      res.status(400).json({ status: 'error', message: err });
    }
    res.status(200).json({ status: 'success', message: "Movie added Successfully", data: movie });
  });
}

exports.editMovie = function(req, res){
  const movie_id = req.params.id;
  const movie_rating = req.body.movie_rating;
  
  Movie.updateOne({ movie_id }, { $set: movie_rating }, (err, movie) => {
    if (err) { res.status(400).json({ status: 'error', message: err }); }
    res.status(200).json({ status: 'success', message: "Movie Updated Successfully", data: movie });
  })
}

exports.deleteMovie = function(req, res){
  const movie_id = req.params.id;
   Movie.findOneAndRemove({ movie_id }, (err, movie) => {
    if (err) { res.status(400).json({ status: 'error', message: err }); }
    res.status(200).json({ status: 'success', message: "Movie deleted Successfully", data: movie });
   })
}

