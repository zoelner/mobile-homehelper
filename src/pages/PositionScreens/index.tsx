import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SelectPosition from './SelectPosition';

export type PositionNavigatorParamList = {
  SelectPosition: undefined;
  Position: undefined;
};

const Position = createStackNavigator<PositionNavigatorParamList>();

function App() {
  return (
    <Position.Navigator>
      <Position.Screen
        name="SelectPosition"
        component={SelectPosition}
        options={{
          headerShown: false,
        }}
      />
    </Position.Navigator>
  );
}

export default App;
