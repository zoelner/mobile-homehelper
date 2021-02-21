import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reducer, Action } from 'redux';
import { persistReducer } from 'redux-persist';

function persist<R, A extends Action>(reducers: Reducer<R, A>) {
  const persistedReducer = persistReducer(
    {
      key: '@homehelper',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers,
  );

  return persistedReducer;
}

export default persist;
