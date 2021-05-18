import React, { useMemo } from 'react';
import { Feather } from '@expo/vector-icons';

import { ServiceBudgetType } from '~/@types/ServiceBudget';

import {
  Container,
  Header,
  Title,
  Status,
  Description,
  Footer,
  FooterWrapper,
  CategoryText,
  CreatedAtText,
} from './styles';
import { parseISO } from 'date-fns/esm';
import { format } from 'date-fns';
import { parserStatus } from '~/core/utils/parsers';

type BudgetItemProps = ServiceBudgetType;

function BudgetItem({
  serviceType,
  professional,
  status,
  description,
  createdAt,
}: BudgetItemProps) {
  const parsedcreatedAt = useMemo(() => {
    return format(parseISO(createdAt), 'dd/MM/yyyy');
  }, []);

  return (
    <Container>
      <Header>
        <Title>{serviceType.name}</Title>
        <Status variant={status}>{parserStatus(status)}</Status>
      </Header>
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
