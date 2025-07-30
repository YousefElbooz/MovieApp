const express = require('express');
const router = express.Router();
const { toggleWatchlist, getWatchlist } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/watchlist/:movieId', auth, toggleWatchlist);
router.get('/watchlist', auth, getWatchlist);

module.exports = router;
