import produce from 'immer';
import { ActionType } from 'typesafe-actions';

import { AuthTypes } from '../auth/types';
import { AuthActions } from '../auth/reducer';
import { UserState, UserTypes } from './types';
import * as Actions from './actions';

export type UserActions = ActionType<typeof Actions>;

export const INITIAL_STATE: UserState = {
  profile: {} as ProfileType,
  roles: [],
};

export default function user(
  state = INITIAL_STATE,
  action: AuthActions | UserActions,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case AuthTypes.SIGN_IN_SUCCESS: {
        const { roles, profile } = action.payload;
        draft.roles = roles;
        draft.profile = profile;
        break;
      }

      case UserTypes.UPDATE_PROFILE: {
        const { profile } = action.payload;
        draft.profile = profile;
        break;
      }

      case AuthTypes.SIGN_OUT: {
        draft.profile = {} as ProfileType;
        draft.roles = [];
        break;
      }
      default:
    }
  });
}
