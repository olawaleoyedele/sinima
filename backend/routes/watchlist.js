const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middlewares/verifyToken");

// POST /api/watchlist - Add movie to watchlist
router.post("/", verifyToken, async (req, res) => {
  const { movie_id, movie_title, poster_path } = req.body;
  const user_id = req.user.userId; // FIX: use userId from JWT payload
  console.log("User from token:", req.user);

  try {
    await db.query(
      "INSERT INTO watchlist (user_id, movie_id, movie_title, poster_path) VALUES ($1, $2, $3, $4)",
      [user_id, movie_id, movie_title, poster_path]
    );
    res.status(201).json({ message: "Movie added to watchlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save movie" });
  }
});

// GET /api/watchlist - Get user's watchlist
router.get("/", verifyToken, async (req, res) => {
  const user_id = req.user.userId; // FIX: use userId from JWT payload

  try {
    const { rows } = await db.query(
      "SELECT * FROM watchlist WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});

// DELETE /api/watchlist/:movie_id - Remove movie from watchlist
router.delete("/:movie_id", verifyToken, async (req, res) => {
  const user_id = req.user.userId;
  const { movie_id } = req.params;
  try {
    await db.query(
      "DELETE FROM watchlist WHERE user_id = $1 AND movie_id = $2",
      [user_id, movie_id]
    );
    res.json({ message: "Movie removed from watchlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove movie" });
  }
});

module.exports = router;
// This code defines routes for managing a user's watchlist in a movie application.
// It includes a POST route to add movies to the watchlist and a GET route to retrieve