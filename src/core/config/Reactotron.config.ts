/* eslint-disable import/no-extraneous-dependencies */

import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

Reactotron.configure({
  host: '192.168.100.27',
})
  .useReactNative()
  .use(reactotronRedux())
  .use(sagaPlugin({ except: [''] }));

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear?.();
}

export default Reactotron;
