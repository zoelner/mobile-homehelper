import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-homehelper.herokuapp.com/api',
});

export default api;
