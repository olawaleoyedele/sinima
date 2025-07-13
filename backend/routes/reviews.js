const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyToken = require('../middlewares/verifyToken');

// Add a review
router.post('/', verifyToken, async (req, res) => {
  const { movie_id, review } = req.body;
  const user_id = req.user.userId;
  if (!movie_id || !review) return res.status(400).json({ error: 'Movie ID and review required' });
  try {
    await pool.query(
      'INSERT INTO reviews (user_id, movie_id, review) VALUES ($1, $2, $3)',
      [user_id, movie_id, review]
    );
    res.json({ message: 'Review added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// Get all reviews for a movie (with username)
router.get('/:movie_id', async (req, res) => {
  const { movie_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT r.review, r.created_at, u.username FROM reviews r
       JOIN users u ON r.user_id = u.id WHERE r.movie_id = $1
       ORDER BY r.created_at DESC`,
      [movie_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
