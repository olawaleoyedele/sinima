import axios from "axios";

export const getWatchlist = async (token) => {
  const res = await axios.get("http://localhost:5000/api/watchlist", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addToWatchlist = async (movie, token) => {
  return axios.post(
    "http://localhost:5000/api/watchlist",
    movie,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const removeFromWatchlist = async (movie_id, token) => {
  return axios.delete(`http://localhost:5000/api/watchlist/${movie_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
