import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import api from '../../../services/api';
import { AuthTypes } from './types';
import * as RootNavigation from '../../../services/RootNavigation';

import {
  signInSuccess,
  signFailure,
  refreshTokenSuccess,
  refreshTokenFailure,
  signUpSuccess,
  signInRequest,
  signUpRequest,
} from './actions';
import { Alert } from 'react-native';

export function* signIn({ payload }: ReturnType<typeof signInRequest>) {
  try {
    const { username, password } = payload;

    const response = yield call(api.post, `/auth/login`, {
      username,
      password,
    });

    const { refreshToken, token, roles } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess({ refreshToken, token, roles }));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados',
    );
    yield put(signFailure());
  }
}

export function* loadToken() {
  const token = yield select((state) => state.auth.token);

  if (!token) return;

  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function* getRefreshToken() {
  try {
    const loadedRefreshToken = yield select((state) => state.auth.refreshToken);
    const response = yield call(api.post, '/auth/token', {
      refreshToken: loadedRefreshToken,
    });

    const { refreshToken, token, roles } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(refreshTokenSuccess({ refreshToken, token, roles }));
  } catch (error) {
    yield put(refreshTokenFailure());
  }
}

export function* signUp({ payload }: ReturnType<typeof signUpRequest>) {
  try {
    const { name, username, email, password } = payload;

    yield call(api.post, `/signup`, {
      name,
      username,
      email,
      password,
      professional: true,
    });

    Alert.alert(
      'Cadastro realizado com sucesso!',
      'Você já pode fazer login na aplicação',
    );

    yield put(signUpSuccess());

    RootNavigation.goBack();
  } catch (err) {
    Alert.alert('Falha no cadastro, verifique seus dados!');
    yield put(signFailure());
  }
}

/* istanbul ignore next */
export function signOut() {}

export default all([
  takeLatest('persist/REHYDRATE', loadToken),
  takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
  takeLatest(AuthTypes.REFRESH_TOKEN_REQUEST, getRefreshToken),
  takeLatest(AuthTypes.SIGN_OUT, signOut),
]);
