import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import HeaderRight from '~/components/HeaderRight';

const RootNavigator = createStackNavigator();

function AuthRoutes() {
  return (
    <RootNavigator.Navigator>
      <RootNavigator.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'Bem Vindo',
          headerRight: ({ tintColor }) => (
            <HeaderRight
              text="Cadastrar"
              screen="SignUp"
              tintColor={tintColor}
            />
          ),
        }}
      />
      <RootNavigator.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'Cadastro',
        }}
      />
    </RootNavigator.Navigator>
  );
}

export default AuthRoutes;
