/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import '~/core/config/Reactotron.config';

import { store, persistor } from '~/core/store';
import Navigations from '~/navigations';
import { navigationRef } from '~/core/services/RootNavigation';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar style="dark" translucent backgroundColor="#ffffff" />
        <NavigationContainer ref={navigationRef}>
          <Navigations />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
