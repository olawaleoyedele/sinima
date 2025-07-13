import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getWatchlist = async (token) => {
  const res = await axios.get(`${BASE_URL}/watchlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addToWatchlist = async (movie, token) => {
  return axios.post(
    `${BASE_URL}/watchlist`,
    movie,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const removeFromWatchlist = async (movie_id, token) => {
  return axios.delete(`${BASE_URL}/watchlist/${movie_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
