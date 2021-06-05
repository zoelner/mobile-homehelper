import React, { useCallback, useMemo } from 'react';
import { Feather } from '@expo/vector-icons';
import { parseISO } from 'date-fns/esm';
import { format } from 'date-fns';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';

import { ServiceBudgetType } from '~/@types/ServiceBudget';
import { parserStatus } from '~/core/utils/parsers';
import { BudgetsScreensNavigatorParamList } from '~/navigations/app.routes/bugets.routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '~/navigations/app.routes';

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

type BudgetItemProps = ServiceBudgetType;

type BudgetItemNavigation = CompositeNavigationProp<
  StackNavigationProp<BudgetsScreensNavigatorParamList, 'BudgetList'>,
  StackNavigationProp<RootParamList>
>;

function BudgetItem({
  id,
  serviceType,
  professional,
  status,
  description,
  createdAt,
}: BudgetItemProps) {
  const navigation = useNavigation<BudgetItemNavigation>();

  const parsedcreatedAt = useMemo(() => {
    return format(parseISO(createdAt), 'dd/MM/yyyy');
  }, []);

  const parsedStatus = useMemo(() => {
    return parserStatus(status);
  }, [status]);

  const navigateToBudgetDescription = useCallback(() => {
    navigation.push('BudgetDescription', {
      id,
      name: serviceType.name,
    });
  }, [id, serviceType.name]);

  return (
    <Container onPress={navigateToBudgetDescription}>
      <Header>
        <Title ellipsizeMode="tail">{serviceType.name}</Title>
        <Status variant={status}>{parsedStatus}</Status>
      </Header>
      <Description numberOfLines={3} ellipsizeMode="tail">
        {description}
      </Description>
      <Footer>
        <FooterWrapper>
          <Feather name="info" size={20} color="#363f5f" />
          <CategoryText>{professional?.name}</CategoryText>
        </FooterWrapper>

        <CreatedAtText>{parsedcreatedAt}</CreatedAtText>
      </Footer>
    </Container>
  );
}

export default BudgetItem;
