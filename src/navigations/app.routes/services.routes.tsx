import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Service from '~/pages/ServiceScreens/Service';
import ProfessionalsList from '~/pages/ServiceScreens/ProfesssionalsList';
import ProfessionalProfile from '~/pages/ServiceScreens/ProfessionalProfile';
import ServiceBudget from '~/pages/ServiceScreens/ServiceBudget';
import ServiceBudgetImages from '~/pages/ServiceScreens/ServiceBudgetImages';

export type ServiceScreensNavigatorParamList = {
  Service: { id: number };
  ProfessionalsList: { service: ServiceType };
  ProfessionalProfile: {
    service: ServiceType;
    profile: ProfessionalProfileType;
  };
  ServiceBudget: {
    service: ServiceType;
    profile: ProfessionalProfileType;
  };
  ServiceBudgetImages: {
    requestId: number;
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
        }}
      />
      <Stack.Screen
        name="ProfessionalsList"
        component={ProfessionalsList}
        options={({ route }) => ({
          headerShown: true,
          title: 'Profissionais',
          headerBackTitle: 'Voltar',
        })}
      />
      <Stack.Screen
        name="ProfessionalProfile"
        component={ProfessionalProfile}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.profile.name,
        })}
      />
      <Stack.Screen
        name="ServiceBudget"
        component={ServiceBudget}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.service.name,
          headerBackTitle: route.params.profile.name,
        })}
      />
      <Stack.Screen
        name="ServiceBudgetImages"
        component={ServiceBudgetImages}
        options={({ route }) => ({
          title: 'Selecionar Fotos',
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
}

export default ServiceScreens;
