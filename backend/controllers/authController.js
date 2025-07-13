const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashed]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    // Improved error handling for duplicate username/email
    if (err.code === '23505') {
      // Unique violation
      let message = 'Registration failed';
      if (err.detail && typeof err.detail === 'string') {
        if (err.detail.includes('username')) {
          message = 'Username already exists.';
        } else if (err.detail.includes('email')) {
          message = 'Email already exists.';
        }
      }
      return res.status(400).json({ error: message });
    }
    // For other errors, return 500
    res.status(500).json({ error: 'Registration failed due to a server error.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    if (!process.env.JWT_SECRET) {
      console.warn('JWT_SECRET is not set in environment variables.');
      return res.status(500).json({ error: 'Server misconfiguration. Please contact admin.' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };
// This file handles user registration and login.
// It uses bcrypt for password hashing and JWT for authentication.