import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Text } from 'react-native';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const RootNavigator = createStackNavigator();

interface HeaderRightProps {
  text: String;
}

function HeaderRight({ text }: HeaderRightProps): React.ReactElement {
  return <Text style={{ marginRight: 16 }}>{text}</Text>;
}

function Routes() {
  return (
    <RootNavigator.Navigator>
      <RootNavigator.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'Home Helper',
          headerRight: () => <HeaderRight text="Cadastrar" />,
        }}
      />
      <RootNavigator.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'Home Helper',
          headerRight: () => <HeaderRight text="Entrar" />,
        }}
      />
    </RootNavigator.Navigator>
  );
}

export default Routes;
