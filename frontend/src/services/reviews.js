import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getReviews = async (movie_id) => {
  const res = await axios.get(`${BASE_URL}/reviews/${movie_id}`);
  return res.data;
};

export const addReview = async (movie_id, review, token) => {
  return axios.post(
    `${BASE_URL}/reviews`,
    { movie_id, review },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
