import {
  createStore as createStoreRedux,
  compose,
  applyMiddleware,
  Reducer,
  Middleware,
  Action,
} from 'redux';

import Reactotron from '../config/Reactotron.config';

function createStore<R, A extends Action>(
  reducers: Reducer<R, A>,
  middlewares: Middleware[],
) {
  const enhancer =
    __DEV__ && Reactotron.createEnhancer
      ? compose(Reactotron.createEnhancer(), applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);

  return createStoreRedux(reducers, enhancer);
}

export default createStore;
