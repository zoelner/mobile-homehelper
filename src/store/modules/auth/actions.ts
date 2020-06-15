import { action } from 'typesafe-actions';
import { AuthTypes } from './types';

interface SignInRequestParams {
  username: string;
  password: string;
}

export const signInRequest = ({ username, password }: SignInRequestParams) =>
  action(AuthTypes.SIGN_IN_REQUEST, { username, password });

interface SignInSuccessParams {
  token: string;
  refreshToken: string;
  roles: string[];
}

export const signInSuccess = ({
  token,
  refreshToken,
  roles,
}: SignInSuccessParams) =>
  action(AuthTypes.SIGN_IN_SUCCESS, { token, refreshToken, roles });

interface SignUpRequestParams {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const signUpRequest = ({
  name,
  username,
  email,
  password,
}: SignUpRequestParams) =>
  action(AuthTypes.SIGN_UP_REQUEST, { name, username, email, password });

export const signUpSuccess = () => action(AuthTypes.SIGN_UP_SUCCESS);

export const signFailure = () => action(AuthTypes.SIGN_FAILURE);

export const signOut = () => action(AuthTypes.SIGN_OUT);

export const refreshTokenRequest = () =>
  action(AuthTypes.REFRESH_TOKEN_REQUEST);

type RefreshTokenSuccessParams = SignInSuccessParams;

export const refreshTokenSuccess = ({
  refreshToken,
  token,
  roles,
}: RefreshTokenSuccessParams) =>
  action(AuthTypes.REFRESH_TOKEN_SUCCESS, { refreshToken, token, roles });

export const refreshTokenFailure = () =>
  action(AuthTypes.REFRESH_TOKEN_FAILURE);
