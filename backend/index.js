// ...existing code...
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// DB connection
const pool = require('./config/db');

// Routes
const authRoutes = require('./routes/auth');
const watchlistRoutes = require('./routes/watchlist');
const moviesRoutes = require('./routes/movies');
const favouritesRoutes = require('./routes/favourites');

const app = express();
app.use(cors());
app.use(express.json());

const ratingsRouter = require('./routes/ratings');
const profileRouter = require('./routes/profile');
const reviewsRouter = require('./routes/reviews');

// Route usage
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes); 
app.use('/api/movies', moviesRoutes);
app.use('/api/favourites', favouritesRoutes);
app.use('/api/ratings', ratingsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/reviews', reviewsRouter);

// Test DB connection
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`API is running 🎬 — DB time: ${result.rows[0].now}`);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).send("DB connection failed");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
