import axios from 'axios';

const API_URL = 'http://localhost:3002/api/';

const login = (values) => axios
  .post(`${API_URL}login`, values)
  .then((response) => {
    if (response.data.token) {
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }
    return response.data;
  });

const logout = () => {
  localStorage.removeItem('token');
};

export default {
  login,
  logout,
};
