import axios, { AxiosError } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Configuration from '~/core/config/configuration';
import Reactotron from '~/core/config/Reactotron.config';

export const BASE_URL = 'https://api-homehelper.herokuapp.com/api';

const api = axios.create({
  baseURL: BASE_URL,
});

export async function getAccessToken() {
  const token = await AsyncStorage.getItem(Configuration.AUTH.KEY_TOKEN);
  return token;
}

getAccessToken().then((token) => {
  Reactotron.log?.(`acessToken: ${token}`);
});

const refreshAuthLogic = async (request: AxiosError) => {
  const refreshToken = await AsyncStorage.getItem(
    Configuration.AUTH.KEY_REFRESH_TOKEN,
  );

  const response = await axios.post<{ token: string }>(
    `${BASE_URL}/token/refresh`,
    { refreshToken },
  );

  AsyncStorage.setItem(Configuration.AUTH.KEY_TOKEN, response.data.token);

  if (request.response) {
    request.response.config.headers.Authorization = `Bearer ${response.data.token}`;
  }
};

api.interceptors.request.use(async (request) => {
  request.headers.Authorization = `Bearer ${await getAccessToken()}`;
  return request;
});

createAuthRefreshInterceptor(api, refreshAuthLogic);

export default api;
