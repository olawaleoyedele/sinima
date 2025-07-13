const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/movies/search?query=movieTitle
// Enhanced search: title, genre, year, rating, release_date, popularity
router.get('/search', async (req, res) => {
  const { query, genre, year, rating, release_date, popularity, page } = req.query;
  try {
    // Build TMDB discover params
    let params = {
      api_key: process.env.TMDB_API_KEY,
      language: 'en-US',
      include_adult: false,
      page: page ? Number(page) : 1,
    };
    if (query) params.query = query;
    if (genre) params.with_genres = genre;
    if (year) params.primary_release_year = year;
    if (rating) params['vote_average.gte'] = rating;
    if (release_date) params['primary_release_date.gte'] = release_date;
    if (popularity) params.sort_by = 'popularity.desc';

    let tmdbUrl;
    if (query) {
      tmdbUrl = 'https://api.themoviedb.org/3/search/movie';
    } else {
      tmdbUrl = 'https://api.themoviedb.org/3/discover/movie';
    }

    const tmdbRes = await axios.get(tmdbUrl, { params });
    res.json({
      results: tmdbRes.data.results,
      page: tmdbRes.data.page,
      total_pages: tmdbRes.data.total_pages,
      total_results: tmdbRes.data.total_results
    });
  } catch (err) {
    // Enhanced error logging and response
    if (err.response) {
      console.error('TMDB API error:', err.response.status, err.response.data);
      res.status(500).json({
        error: 'Failed to fetch movies from TMDB',
        tmdbStatus: err.response.status,
        tmdbMessage: err.response.data.status_message || err.response.data
      });
    } else {
      console.error('Server error:', err.message);
      res.status(500).json({ error: 'Failed to fetch movies from TMDB', message: err.message });
    }
  }
});

module.exports = router;
