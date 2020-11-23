import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

function persist(reducers) {
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
