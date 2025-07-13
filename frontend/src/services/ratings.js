import axios from "axios";

export const getAverageRating = async (movie_id) => {
  const res = await axios.get(`http://localhost:5000/api/ratings/average/${movie_id}`);
  return res.data;
};

export const getUserRating = async (movie_id, token) => {
  const res = await axios.get(`http://localhost:5000/api/ratings/user/${movie_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const setUserRating = async (movie_id, rating, token) => {
  return axios.post(
    `http://localhost:5000/api/ratings`,
    { movie_id, rating },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
