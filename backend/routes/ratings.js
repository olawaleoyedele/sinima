const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyToken = require('../middlewares/verifyToken');

// Add or update a rating
router.post('/', verifyToken, async (req, res) => {
  const { movie_id, rating } = req.body;
  const user_id = req.user.userId;
  if (!movie_id || !rating) return res.status(400).json({ error: 'Movie ID and rating required' });
  if (rating < 1 || rating > 10) return res.status(400).json({ error: 'Rating must be 1-10' });
  try {
    await pool.query(
      `INSERT INTO ratings (user_id, movie_id, rating) VALUES ($1, $2, $3)
       ON CONFLICT (user_id, movie_id) DO UPDATE SET rating = EXCLUDED.rating, created_at = CURRENT_TIMESTAMP`,
      [user_id, movie_id, rating]
    );
    res.json({ message: 'Rating saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save rating' });
  }
});

// Get a user's rating for a movie
router.get('/user/:movie_id', verifyToken, async (req, res) => {
  const user_id = req.user.userId;
  const { movie_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT rating FROM ratings WHERE user_id = $1 AND movie_id = $2',
      [user_id, movie_id]
    );
    if (result.rows.length === 0) return res.json({ rating: null });
    res.json({ rating: result.rows[0].rating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch rating' });
  }
});

// Get average rating for a movie
router.get('/average/:movie_id', async (req, res) => {
  const { movie_id } = req.params;
  try {
    const result = await pool.query(
      'SELECT AVG(rating)::numeric(3,1) as avg_rating, COUNT(*) as count FROM ratings WHERE movie_id = $1',
      [movie_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch average rating' });
  }
});

module.exports = router;
