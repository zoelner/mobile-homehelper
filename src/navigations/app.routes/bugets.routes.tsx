import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BudgetList from '~/pages/BudgetsScreens/BudgetList';
import BudgetDescription from '~/pages/BudgetsScreens/BudgetDescription';

export type BudgetsScreensNavigatorParamList = {
  BudgetList: undefined;
  BudgetDescription: {
    id: number;
    name: string;
  };
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
      <Budgets.Screen
        name="BudgetDescription"
        component={BudgetDescription}
        options={({ route }) => ({
          headerBackTitle: 'Orçamentos',
          title: route.params.name,
        })}
      />
    </Budgets.Navigator>
  );
}

export default BudgetsScreens;
