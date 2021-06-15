import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { ServiceBudgetType } from '~/@types/ServiceBudget';
import api from '~/core/services/api';
import BudgetItem from './BudgetItem';
import BudgetItemEmpty from './BudgetItemEmpty';

import { Container, Header, HeaderText } from './styles';

function BudgetList() {
  const [budgets, setBudgets] = useState([] as ServiceBudgetType[]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const loadBudgets = useCallback(async () => {
    const response = await api.get<ServiceBudgetType[]>('service');
    setBudgets(response.data);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadBudgets);

    return unsubscribe;
  }, [loadBudgets]);

  async function refreshingBudgets() {
    setRefreshing(true);
    await loadBudgets();
    setRefreshing(false);
  }

  return (
    <Container>
      <Header>
        <HeaderText>Minhas Solicitações de Serviços</HeaderText>
      </Header>

      <FlatList<ServiceBudgetType>
        style={{ flex: 1 }}
        data={budgets}
        keyExtractor={(budget) => String(budget.id)}
        renderItem={({ item: budget }) => <BudgetItem {...budget} />}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshingBudgets}
        refreshing={refreshing}
        ListEmptyComponent={BudgetItemEmpty}
      />
    </Container>
  );
}

export default BudgetList;
