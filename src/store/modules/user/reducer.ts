import produce from 'immer';

import { AuthTypes } from '../auth/types';
import { AuthActions } from '../auth/reducer';
import { UserState } from './types';

export const INITIAL_STATE: UserState = {
  profile: null,
  roles: [],
};

export default function user(state = INITIAL_STATE, action: AuthActions) {
  return produce(state, (draft) => {
    switch (action.type) {
      case AuthTypes.SIGN_IN_SUCCESS: {
        const { roles } = action.payload;
        draft.roles = roles;
        break;
      }

      case AuthTypes.SIGN_OUT: {
        draft.profile = null;
        draft.roles = [];
        break;
      }
      default:
    }
  });
}
