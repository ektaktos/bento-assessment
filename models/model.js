const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    google_token: { type: String }
});

let moviesSchema = newSchema({
  movie_id: { type: String },
  user_email: { type: String },
  movie_title: { type: String },
  movie_rating: { type: Number},
  date_created: { type:Date, default: Date.now()}
});

const user = mongoose.model('users', userSchema);
const movies = mongoose.model('movies', moviesSchema);

module.exports = {
    userModel: user,
    moviesModel: movies
}