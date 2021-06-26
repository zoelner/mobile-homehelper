import React from 'react';

import { Container, Title, Description } from './styles';

function BudgetItemEmpty({}) {
  return (
    <Container>
      <Title ellipsizeMode="tail">Oopss...</Title>
      <Description numberOfLines={3} ellipsizeMode="tail">
        Ainda não temos nenhum dado para exibir...
      </Description>
    </Container>
  );
}

export default BudgetItemEmpty;
