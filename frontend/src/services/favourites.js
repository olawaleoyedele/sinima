import axios from "axios";

export const getFavourites = async (token) => {
  const res = await axios.get("http://localhost:5000/api/favourites", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addToFavourites = async (movie, token) => {
  return axios.post(
    "http://localhost:5000/api/favourites",
    movie,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const removeFromFavourites = async (movie_id, token) => {
  return axios.delete(`http://localhost:5000/api/favourites/${movie_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
