import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BASE_URL}/profile`;

export const getProfile = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProfile = async (data, token) => {
  const res = await axios.put(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
