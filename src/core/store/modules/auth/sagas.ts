import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../../services/api';
import { AuthTypes } from './types';
import * as RootNavigation from '../../../services/RootNavigation';
import Configuration from '../../../config/configuration';

import {
  signInSuccess,
  signFailure,
  signUpSuccess,
  signInRequest,
  signUpRequest,
} from './actions';

import { Roles } from '../user/types';
import Reactotron from '~/core/config/Reactotron.config';

export function* signIn({ payload }: ReturnType<typeof signInRequest>) {
  try {
    const { username, password } = payload;

    const response: AxiosResponse<{
      refreshToken: string;
      token: string;
      roles: Roles[];
    }> = yield call(api.post, '/auth/login', {
      username,
      password,
    });

    const { refreshToken, token, roles } = response.data;

    if (roles.includes(Roles.ROLE_PROFESSIONAL)) {
      Alert.alert(
        'Essa plataforma é exclusiva para clientes.',
        'Você profissional deve utilizar a plataforma web.',
      );

      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    AsyncStorage.setItem(Configuration.AUTH.KEY_REFRESH_TOKEN, token);
    AsyncStorage.setItem(Configuration.AUTH.KEY_TOKEN, refreshToken);

    const responseProfile: AxiosResponse<ProfileType> = yield call(
      api.get,
      '/profile',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const profile = responseProfile.data;

    yield put(signInSuccess({ roles, profile }));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados',
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }: ReturnType<typeof signUpRequest>) {
  try {
    const { name, username, email, password } = payload;

    yield call(api.post, '/signup', {
      name,
      username,
      email,
      password,
      professional: false,
    });

    Alert.alert(
      'Cadastro realizado com sucesso!',
      'Você já pode fazer login na aplicação',
    );

    yield put(signUpSuccess());

    RootNavigation.goBack();
  } catch (err) {
    if (err?.response?.data?.message) {
      Alert.alert('Cadastro não realizado.', err.response.data.message);
    } else {
      Alert.alert('Falha no cadastro, verifique seus dados!');
    }
    yield put(signFailure());
  }
}

export default all([
  takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
]);
