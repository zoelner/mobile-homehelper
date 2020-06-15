export enum AuthTypes {
  SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS',
  SIGN_FAILURE = '@auth/SIGN_FAILURE',
  SIGN_OUT = '@auth/SIGN_OUT',
  SIGN_UP_REQUEST = '@auth/SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS = '@auth/SIGN_UP_SUCCESS',
  REFRESH_TOKEN_REQUEST = '@auth/REFRESH_TOKEN_REQUEST',
  REFRESH_TOKEN_SUCCESS = '@auth/REFRESH_TOKEN_SUCCESS',
  REFRESH_TOKEN_FAILURE = '@auth/REFRESH_TOKEN_FAILURE',
}

export type AuthState = {
  token: string | null;
  refreshToken: string | null;
  signed: boolean;
  loading: boolean;
};
