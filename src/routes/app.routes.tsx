import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import HeaderRight from '../components/HeaderRight';
import { useDispatch } from 'react-redux';
import { signOut } from '../store/modules/auth/actions';

const AppNavigator = createStackNavigator();

const AppRoutes: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <AppNavigator.Navigator>
      <AppNavigator.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          headerRight: ({ tintColor }) => (
            <HeaderRight
              text="Sair"
              tintColor={tintColor}
              onPress={() => dispatch(signOut())}
            />
          ),
        }}
      />
    </AppNavigator.Navigator>
  );
};

export default AppRoutes;
