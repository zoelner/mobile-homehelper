import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Service from '../Service';

export type ServiceScreensNavigatorParamList = {
  Service: {
    id: number;
  };
};

const Stack = createStackNavigator<ServiceScreensNavigatorParamList>();

function ServiceScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Service"
        component={Service}
        options={{
          headerShown: true,
          title: 'Serviços',
          headerBackTitle: 'Voltar',
        }}
      />
    </Stack.Navigator>
  );
}

export default ServiceScreens;
