import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SelectPosition from '../../pages/PositionScreens/SelectPosition';
import FindPosition, {
  NominatinResponse,
} from '../../pages/PositionScreens/FindPosition';
import ConfirmPosition from '../../pages/PositionScreens/ConfirmPosition';

export type PositionScreensNavigatorParamList = {
  SelectPosition: undefined;
  FindPosition: {
    data: NominatinResponse;
    isNew: boolean;
  };
  ConfirmPosition: {
    data: NominatinResponse;
    isNew: boolean;
  };
};

const Positions = createStackNavigator<PositionScreensNavigatorParamList>();

function PositionScreens() {
  return (
    <Positions.Navigator>
      <Positions.Screen
        name="SelectPosition"
        component={SelectPosition}
        options={{
          headerShown: false,
        }}
      />
      <Positions.Screen
        name="FindPosition"
        component={FindPosition}
        options={{
          headerShown: false,
        }}
      />
      <Positions.Screen
        name="ConfirmPosition"
        component={ConfirmPosition}
        options={{
          headerShown: false,
        }}
      />
    </Positions.Navigator>
  );
}

export default PositionScreens;
