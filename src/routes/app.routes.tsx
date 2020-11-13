import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../pages/Dashboard';
import { createStackNavigator } from '@react-navigation/stack';

import SelectPosition from '../pages/PositionScreens/SelectPosition';
import FindPosition, {
  NominatinResponse,
} from '../pages/PositionScreens/FindPosition';
import ConfirmPosition from '../pages/PositionScreens/ConfirmPosition';

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
  Positions: undefined;
  SelectPosition: undefined;
  FindPosition: {
    latitude: number;
    longitude: number;
  };
  ConfirmPosition: NominatinResponse;
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
        name="SelectPosition"
        component={SelectPosition}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FindPosition"
        component={FindPosition}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmPosition"
        component={ConfirmPosition}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default App;
