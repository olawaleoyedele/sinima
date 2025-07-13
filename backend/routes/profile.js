const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyToken = require('../middlewares/verifyToken');

// Get user profile and stats
router.get('/', verifyToken, async (req, res) => {
  const user_id = req.user.userId;
  try {
    const userResult = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [user_id]);
    if (userResult.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    const user = userResult.rows[0];

    const favCount = await pool.query('SELECT COUNT(*) FROM favourites WHERE user_id = $1', [user_id]);
    const watchlistCount = await pool.query('SELECT COUNT(*) FROM watchlist WHERE user_id = $1', [user_id]);
    const ratingCount = await pool.query('SELECT COUNT(*) FROM ratings WHERE user_id = $1', [user_id]);

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      favourites: Number(favCount.rows[0].count),
      watchlist: Number(watchlistCount.rows[0].count),
      ratings: Number(ratingCount.rows[0].count)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

module.exports = router;

// Update user profile (username, email, password)
const bcrypt = require('bcryptjs');
router.put('/', verifyToken, async (req, res) => {
  const user_id = req.user.userId;
  const { username, email, password } = req.body;
  try {
    // Check if username or email is taken by another user
    if (username) {
      const userCheck = await pool.query('SELECT id FROM users WHERE username = $1 AND id != $2', [username, user_id]);
      if (userCheck.rows.length > 0) {
        return res.status(400).json({ error: 'Username already taken.' });
      }
    }
    if (email) {
      const emailCheck = await pool.query('SELECT id FROM users WHERE email = $1 AND id != $2', [email, user_id]);
      if (emailCheck.rows.length > 0) {
        return res.status(400).json({ error: 'Email already taken.' });
      }
    }
    // Build update query
    let updateFields = [];
    let updateValues = [];
    let idx = 1;
    if (username) {
      updateFields.push(`username = $${idx++}`);
      updateValues.push(username);
    }
    if (email) {
      updateFields.push(`email = $${idx++}`);
      updateValues.push(email);
    }
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateFields.push(`password = $${idx++}`);
      updateValues.push(hashed);
    }
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update.' });
    }
    updateValues.push(user_id);
    const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = $${idx} RETURNING id, username, email`;
    const result = await pool.query(query, updateValues);
    res.json({ message: 'Profile updated successfully', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});
