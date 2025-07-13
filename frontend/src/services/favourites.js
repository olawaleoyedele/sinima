import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getFavourites = async (token) => {
  const res = await axios.get(`${BASE_URL}/api/favourites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addToFavourites = async (movie, token) => {
  return axios.post(
    `${BASE_URL}/favourites`,
    movie,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const removeFromFavourites = async (movie_id, token) => {
  return axios.delete(`${BASE_URL}/favourites/${movie_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
