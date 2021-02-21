import { combineReducers } from 'redux';

import auth, { AuthActions } from './auth/reducer';
import user from './user/reducer';

const rootReducer = combineReducers({
  auth,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;

export type RootActions = AuthActions;

export default rootReducer;
