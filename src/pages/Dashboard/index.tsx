import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { RootParamList } from '~/core/routes/app.routes';
import api from '~/core/services/api';

import {
  Container,
  Header,
  HeaderText,
  HeaderButton,
  HeaderButtonContent,
  CategoryList,
  ServiceList,
  Title,
} from './styles';

import CategoryItem from './CategoryItem';
import ServiceItem from './ServiceItem';

type Props = BottomTabScreenProps<RootParamList, 'Main'>;

type DashboardState = {
  categories: CategoryType[];
  services: ServiceType[];
};

function Dashboard({ navigation }: Props) {
  const [state, setState] = useState<DashboardState>({} as DashboardState);

  useEffect(() => {
    async function loadDashboardScreen() {
      try {
        const [categoriesResponse, servicesResponse] = await Promise.all([
          api.get<CategoryType[]>('category'),
          api.get<ServiceType[]>('servicetype'),
        ]);

        setState({
          categories: categoriesResponse.data,
          services: servicesResponse.data,
        });
      } catch (error) {
        Alert.alert('Não foi possivel obter as categorias.');
      }
    }

    loadDashboardScreen();
  }, []);

  function navigateToCategory(id: number) {
    navigation.navigate('ServiceScreens', {
      screen: 'Service',
      params: { id },
    });
  }

  return (
    <Container>
      <Header>
        <HeaderButton
          onPress={() => {
            navigation.navigate('PositionScreens', {
              screen: 'SelectPosition',
            });
          }}
        >
          <HeaderButtonContent>
            <HeaderText> R. Rio São Francisco</HeaderText>
            <Icon name="keyboard-arrow-down" color="#717171" />
          </HeaderButtonContent>
        </HeaderButton>
      </Header>

      <CategoryList
        data={state.categories}
        keyExtractor={(category) => String(category.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: category }) => (
          <CategoryItem data={category} onPress={navigateToCategory} />
        )}
      />

      <Title>Serviços</Title>

      <ServiceList
        data={state.services}
        keyExtractor={(service) => String(service.id)}
        numColumns={2}
        renderItem={({ item: service }) => <ServiceItem data={service} />}
      />
    </Container>
  );
}

export default Dashboard;
