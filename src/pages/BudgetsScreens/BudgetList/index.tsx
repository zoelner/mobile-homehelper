import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import { ServiceBudgetType } from '~/@types/ServiceBudget';
import api from '~/core/services/api';
import BudgetItem from './BudgetItem';

import { Container, Header, HeaderText } from './styles';

function BudgetList() {
  const [budgets, setBudgets] = useState([] as ServiceBudgetType[]);

  useEffect(() => {
    async function loadBudgets() {
      const response = await api.get<ServiceBudgetType[]>('service');

      setBudgets(response.data);
    }
    loadBudgets();
  }, []);

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
      />
    </Container>
  );
}

export default BudgetList;
