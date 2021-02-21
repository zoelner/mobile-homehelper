import axios, { AxiosError } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Configuration from '~/config/configuration';
import Reactotron from '~/config/Reactotron.config';

const api = axios.create({
  baseURL: 'https://api-homehelper.herokuapp.com/api',
});

async function getAccessToken() {
  const token = await AsyncStorage.getItem(Configuration.AUTH.KEY_TOKEN);
  return token;
}

let accessToken: string | Promise<string | null> = getAccessToken();

accessToken.then((token) => {
  Reactotron.log?.(`acessToken: ${token}`);
});

const refreshAuthLogic = async (request: AxiosError) => {
  const refreshToken = await AsyncStorage.getItem(
    Configuration.AUTH.KEY_REFRESH_TOKEN,
  );

  const response = await axios.post<{ token: string }>(
    'https://api-homehelper.herokuapp.com/api/token/refresh',
    { refreshToken },
  );

  accessToken = response.data.token;

  AsyncStorage.setItem(Configuration.AUTH.KEY_TOKEN, response.data.token);

  if (request.response) {
    request.response.config.headers.Authorization = `Bearer ${response.data.token}`;
  }
};

api.interceptors.request.use(async (request) => {
  request.headers.Authorization = `Bearer ${await accessToken}`;
  return request;
});

createAuthRefreshInterceptor(api, refreshAuthLogic);

export default api;
