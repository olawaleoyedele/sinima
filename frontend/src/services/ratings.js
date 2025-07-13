import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAverageRating = async (movie_id) => {
  const res = await axios.get(`${BASE_URL}/ratings/average/${movie_id}`);
  return res.data;
};

export const getUserRating = async (movie_id, token) => {
  const res = await axios.get(`${BASE_URL}/ratings/user/${movie_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const setUserRating = async (movie_id, rating, token) => {
  return axios.post(
    `${BASE_URL}/ratings`,
    { movie_id, rating },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
