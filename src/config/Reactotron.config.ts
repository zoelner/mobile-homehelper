/* eslint-disable import/no-extraneous-dependencies */

import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

Reactotron.configure()
  .useReactNative()
  .use(reactotronRedux())
  .use(sagaPlugin({ except: [''] }));

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear?.();
}

export default Reactotron;
