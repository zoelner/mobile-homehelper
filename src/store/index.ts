import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import Reactotron from '~/config/Reactotron.config';

import createStore from './createStore';
import persistReducers from './persistReducers';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  __DEV__ && Reactotron.createSagaMonitor
    ? Reactotron.createSagaMonitor()
    : undefined;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
