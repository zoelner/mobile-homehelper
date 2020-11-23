import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import api from '../../services/api';

import { RootParamList } from '../../routes/app.routes';

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

import CategoryItem, { CategoryType } from './CategoryItem';
import ServiceItem, { ServiceType } from './ServiceItem';

type Props = BottomTabScreenProps<RootParamList, 'Main'>;

function Dashboard({ navigation }: Props) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [services, setService] = useState<ServiceType[]>([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const [categoriesResponse, servicesResponse] = await Promise.all([
          api.get<CategoryType[]>('category'),
          api.get<ServiceType[]>('servicetype'),
        ]);

        setCategories(categoriesResponse.data);
        setService(servicesResponse.data);
      } catch (error) {
        Alert.alert('Não foi possivel obter as categorias.');
      }
    }

    getCategories();
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
        data={categories}
        keyExtractor={(category) => String(category.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: category }) => (
          <CategoryItem data={category} onPress={navigateToCategory} />
        )}
      />

      <Title>Serviços</Title>

      <ServiceList
        data={services}
        keyExtractor={(service) => String(service.id)}
        numColumns={2}
        renderItem={({ item: service }) => <ServiceItem data={service} />}
      />
    </Container>
  );
}

export default Dashboard;
