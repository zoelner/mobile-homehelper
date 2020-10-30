import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../pages/Dashboard';
import LocalizationScreens from '../pages/LocalizationScreens';
import { createStackNavigator } from '@react-navigation/stack';

export type HomeNavigatorParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const HomeNavigator = createBottomTabNavigator<HomeNavigatorParamList>();

const HomeTabs: React.FC = () => {
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
};

export type StackNavigatorParamList = {
  Home: undefined;
  SetLocalization: undefined;
};

const Stack = createStackNavigator<StackNavigatorParamList>();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SetLocalization"
        component={LocalizationScreens}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default App;
