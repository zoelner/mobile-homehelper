import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';

import Dashboard from '../pages/Dashboard';
import PositionScreens, {
  PositionScreensNavigatorParamList,
} from '../pages/PositionScreens/PositionScreens';

export type HomeNavigatorParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const HomeNavigator = createBottomTabNavigator<HomeNavigatorParamList>();

function HomeTabs() {
  return (
    <HomeNavigator.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#41cebb',
      }}
    >
      <HomeNavigator.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FeatherIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <HomeNavigator.Screen
        name="Search"
        component={Dashboard}
        options={{
          tabBarLabel: 'Busca',
          tabBarIcon: ({ color, size }) => (
            <FeatherIcon name="search" color={color} size={size} />
          ),
        }}
      />
      <HomeNavigator.Screen
        name="Profile"
        component={Dashboard}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <FeatherIcon name="user" color={color} size={size} />
          ),
        }}
      />
    </HomeNavigator.Navigator>
  );
}

export type MainStackParamList = {
  Home: NavigatorScreenParams<HomeNavigatorParamList>;
  PositionScreens: NavigatorScreenParams<PositionScreensNavigatorParamList>;
};

const MainStack = createStackNavigator<MainStackParamList>();

function App() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="PositionScreens"
        component={PositionScreens}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
}

export default App;
