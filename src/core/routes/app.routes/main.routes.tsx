import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '~/pages/Dashboard';

export type MainParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const MainNavigator = createBottomTabNavigator<MainParamList>();

function MainTabs() {
  return (
    <MainNavigator.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#41cebb',
      }}
    >
      <MainNavigator.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FeatherIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Search"
        component={Dashboard}
        options={{
          tabBarLabel: 'Busca',
          tabBarIcon: ({ color, size }) => (
            <FeatherIcon name="search" color={color} size={size} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Profile"
        component={Dashboard}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <FeatherIcon name="user" color={color} size={size} />
          ),
        }}
      />
    </MainNavigator.Navigator>
  );
}

export default MainTabs;
