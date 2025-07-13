import axios from "axios";

export const getReviews = async (movie_id) => {
  const res = await axios.get(`http://localhost:5000/api/reviews/${movie_id}`);
  return res.data;
};

export const addReview = async (movie_id, review, token) => {
  return axios.post(
    `http://localhost:5000/api/reviews`,
    { movie_id, review },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
