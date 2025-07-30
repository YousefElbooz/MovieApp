const Movie = require('../models/movie');

exports.getAllMovies = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const skip = parseInt(req.query.skip) || 0;

    const [movies, total] = await Promise.all([
      Movie.find()
        .sort({ popularity: -1 })
        .skip(skip)
        .limit(limit),
      Movie.countDocuments()
    ]);

    res.json({
      data: movies,
      total: total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
