const User = require('../models/user');
const Movie = require('../models/movie');

exports.toggleWatchlist = async (req, res) => {
  const userId = req.user.id;
  const movieId = req.params.movieId;

  try {
    const user = await User.findById(userId);
    const index = user.watchlist.indexOf(movieId);

    if (index > -1) {
      user.watchlist.splice(index, 1); // remove
    } else {
      user.watchlist.push(movieId); // add
    }

    await user.save();
    res.json({ watchlist: user.watchlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user's watchlist movies
exports.getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('watchlist');
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};