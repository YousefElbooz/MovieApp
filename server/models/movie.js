const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  adult: { type: Boolean, required: true },
  backdrop_path: { type: String },
  genre_ids: [Number],
  id: { type: Number, required: true, unique: true },
  original_language: { type: String },
  original_title: { type: String },
  overview: { type: String },
  popularity: { type: Number },
  poster_path: { type: String },
  release_date: { type: String },
  title: { type: String },
  video: { type: Boolean },
  vote_average: { type: Number },
  vote_count: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
