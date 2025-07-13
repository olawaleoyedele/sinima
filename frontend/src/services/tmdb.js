import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const BACKEND_URL = process.env.REACT_APP_BASE_URL;

/* ───────── Movie Core ───────── */
export const getMovieDetails = async (id) =>
  (await axios.get(`${BASE_URL}/movie/${id}`, { params: { api_key: API_KEY } }))
    .data;

export const getTrendingMovies = async () =>
  (await axios.get(`${BASE_URL}/trending/movie/week`, { params: { api_key: API_KEY } }))
    .data.results;

export const getTopRatedMovies = async () =>
  (await axios.get(`${BASE_URL}/movie/top_rated`, { params: { api_key: API_KEY } }))
    .data.results;

export const getActionMovies = async () =>
  (await axios.get(`${BASE_URL}/discover/movie`, {
    params: { api_key: API_KEY, with_genres: 28 },
  })).data.results;

/* ───────── Search / Discover ───────── */
const API_BASE = `${BACKEND_URL}/movies`; // your own backend proxy
export const searchMovies = async (filters) =>
  (await axios.get(`${API_BASE}/search`, { params: filters })).data;

/* ───────── Trailer ───────── */
export const getMovieTrailer = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
    params: { api_key: API_KEY },
  });
  const trailer = res.data.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  return trailer ? trailer.key : null;
};

/* ───────── NEW: Recommendations ───────── */
export const getRecommendations = async (id, limit = 8) =>
  (await axios.get(`${BASE_URL}/movie/${id}/recommendations`, {
    params: { api_key: API_KEY },
  })).data.results.slice(0, limit);
