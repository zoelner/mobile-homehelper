import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BudgetList from '~/pages/BudgetsScreens/BudgetList';

export type BudgetsScreensNavigatorParamList = {
  BudgetList: undefined;
  BudgetDescription: undefined;
};

const Budgets = createStackNavigator<BudgetsScreensNavigatorParamList>();

function BudgetsScreens() {
  return (
    <Budgets.Navigator>
      <Budgets.Screen
        name="BudgetList"
        component={BudgetList}
        options={{
          headerShown: false,
        }}
      />
    </Budgets.Navigator>
  );
}

export default BudgetsScreens;
