import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Service from '~/pages/ServiceScreens/Service';
import ProfesssionalsList from '~/pages/ServiceScreens/ProfesssionalsList';
import ProfessionalProfile from '~/pages/ServiceScreens/ProfessionalProfile';

export type ServiceScreensNavigatorParamList = {
  Service: { id: number };
  ProfessionalsList: { id: number; serviceName: string };
  ProfessionalProfile: ProfessionalProfileType;
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
        }}
      />
      <Stack.Screen
        name="ProfessionalsList"
        component={ProfesssionalsList}
        options={({ route }) => ({
          headerShown: true,
          title: 'Profissionais',
          headerBackTitle: route.params.serviceName,
        })}
      />
      <Stack.Screen
        name="ProfessionalProfile"
        component={ProfessionalProfile}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.name,
        })}
      />
    </Stack.Navigator>
  );
}

export default ServiceScreens;
