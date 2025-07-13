const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middlewares/verifyToken");

// POST /api/favourites - Add movie to favourites
router.post("/", verifyToken, async (req, res) => {
  const { movie_id, movie_title, poster_path } = req.body;
  const user_id = req.user.userId;
  try {
    await db.query(
      "INSERT INTO favourites (user_id, movie_id, movie_title, poster_path) VALUES ($1, $2, $3, $4)",
      [user_id, movie_id, movie_title, poster_path]
    );
    res.status(201).json({ message: "Movie added to favourites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save movie" });
  }
});

// GET /api/favourites - Get user's favourites
router.get("/", verifyToken, async (req, res) => {
  const user_id = req.user.userId;
  try {
    const { rows } = await db.query(
      "SELECT * FROM favourites WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch favourites" });
  }
});

// DELETE /api/favourites/:movie_id - Remove movie from favourites
router.delete("/:movie_id", verifyToken, async (req, res) => {
  const user_id = req.user.userId;
  const { movie_id } = req.params;
  try {
    await db.query(
      "DELETE FROM favourites WHERE user_id = $1 AND movie_id = $2",
      [user_id, movie_id]
    );
    res.json({ message: "Movie removed from favourites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove movie" });
  }
});

module.exports = router;
