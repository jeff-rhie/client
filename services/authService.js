import axios from 'axios';

const API_URL = 'http://localhost:5432/';

export const signup = async (username, password) => {
  return axios.post(`${API_URL}signup`, {
    username,
    password
  });
};
