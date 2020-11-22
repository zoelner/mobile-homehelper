import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Category from '../Category';

export type ServiceScreensNavigatorParamList = {
  Category: {
    id: number;
  };
};

const Service = createStackNavigator<ServiceScreensNavigatorParamList>();

function ServiceScreens() {
  return (
    <Service.Navigator>
      <Service.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: true,
        }}
      />
    </Service.Navigator>
  );
}

export default ServiceScreens;
