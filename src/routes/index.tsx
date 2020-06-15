import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Text } from 'react-native';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const RootNavigator = createStackNavigator();

interface HeaderRightProps {
  text: string;
  screen: string;
  tintColor?: string;
}

function HeaderRight({
  text,
  screen,
  tintColor,
}: HeaderRightProps): React.ReactElement {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate(screen)}>
      <Text style={{ marginRight: 16, color: tintColor }}>{text}</Text>
    </TouchableWithoutFeedback>
  );
}

function Routes() {
  return (
    <RootNavigator.Navigator>
      <RootNavigator.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'SignIn',
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
          title: 'SignUp',
        }}
      />
    </RootNavigator.Navigator>
  );
}

export default Routes;
