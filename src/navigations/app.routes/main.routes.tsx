import React from 'react';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import BudgetsScreens from './bugets.routes';

export type MainParamList = {
  Home: undefined;
  Budget: undefined;
  Profile: undefined;
};

const MainNavigator = createBottomTabNavigator<MainParamList>();

function MainTabs() {
  return (
    <MainNavigator.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#41cebb',
        keyboardHidesTabBar: true,
      }}
    >
      <MainNavigator.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Budget"
        component={BudgetsScreens}
        options={{
          tabBarLabel: 'Orçamentos',
          tabBarIcon: ({ color, size }) => (
            <Feather name="tool" color={color} size={size} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </MainNavigator.Navigator>
  );
}

export default MainTabs;
