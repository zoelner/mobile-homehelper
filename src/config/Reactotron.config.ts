import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .use(reactotronRedux())
    .use(sagaPlugin({ except: [''] }))
    .connect();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  tron.clear!();

  console.tron = tron;
}
