import { ActionType } from 'typesafe-actions';

import produce from 'immer';

import { AuthState, AuthTypes } from './types';
import * as Actions from './actions';

export type AuthActions = ActionType<typeof Actions>;

export const INITIAL_STATE: AuthState = {
  token: null,
  refreshToken: null,
  signed: false,
  loading: false,
};

export default function auth(
  state = INITIAL_STATE,
  action: AuthActions,
): AuthState {
  return produce(state, (draft) => {
    switch (action.type) {
      case AuthTypes.SIGN_IN_REQUEST:
      case AuthTypes.SIGN_UP_REQUEST:
        draft.loading = true;
        break;

      case AuthTypes.SIGN_UP_SUCCESS: {
        draft.loading = false;
        break;
      }

      case AuthTypes.REFRESH_TOKEN_SUCCESS:
      case AuthTypes.SIGN_IN_SUCCESS: {
        const { refreshToken, token } = action.payload;

        draft.token = token;
        draft.refreshToken = refreshToken;
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case AuthTypes.SIGN_FAILURE:
      case AuthTypes.SIGN_OUT: {
        draft.token = null;
        draft.refreshToken = null;
        draft.signed = false;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
