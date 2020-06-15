import axios, { AxiosError } from 'axios';
import { store } from '../store';
import { refreshTokenRequest } from '../store/modules/auth/actions';

const api = axios.create({
  baseURL: 'https://api-homehelper.herokuapp.com/api',
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log(error);
    if (error.response?.status === 401) {
      store.dispatch(refreshTokenRequest());
    }
  },
);

export default api;
