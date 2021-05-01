import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';

import PositionScreens, {
  PositionScreensNavigatorParamList,
} from './positions.routes';

import ServiceScreens, {
  ServiceScreensNavigatorParamList,
} from './services.routes';

import MainTabs, { MainParamList } from './main.routes';

export type RootParamList = {
  Main: NavigatorScreenParams<MainParamList>;
  PositionScreens: NavigatorScreenParams<PositionScreensNavigatorParamList>;
  ServiceScreens: NavigatorScreenParams<ServiceScreensNavigatorParamList>;
};

const Stack = createStackNavigator<RootParamList>();

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainTabs}
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="PositionScreens"
        component={PositionScreens}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ServiceScreens"
        component={ServiceScreens}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default Root;
