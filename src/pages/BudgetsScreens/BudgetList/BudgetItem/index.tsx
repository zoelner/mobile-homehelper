import React, { useMemo } from 'react';
import { Feather } from '@expo/vector-icons';

import { ServiceBudgetType } from '~/@types/ServiceBudget';

import {
  Container,
  Title,
  Description,
  Footer,
  FooterWrapper,
  CategoryText,
  CreatedAtText,
} from './styles';
import { parseISO } from 'date-fns/esm';
import { format } from 'date-fns';

type BudgetItemProps = ServiceBudgetType;

function BudgetItem({
  serviceType,
  professional,
  description,
  createdAt,
}: BudgetItemProps) {
  const parsedcreatedAt = useMemo(() => {
    return format(parseISO(createdAt), 'dd/MM/yyyy');
  }, []);

  return (
    <Container>
      <Title>{serviceType.name}</Title>
      <Description numberOfLines={3} ellipsizeMode="tail">
        {description}
      </Description>
      <Footer>
        <FooterWrapper>
          <Feather name="info" size={20} color="#363f5f" />
          <CategoryText>{professional.name}</CategoryText>
        </FooterWrapper>

        <CreatedAtText>{parsedcreatedAt}</CreatedAtText>
      </Footer>
    </Container>
  );
}

export default BudgetItem;
