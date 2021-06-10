import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';

import { RootParamList } from '~/navigations/app.routes';
import api from '~/core/services/api';

import { parseProfileAddress } from '~/core/utils/parsers';

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
import { RootState } from '~/core/store/modules/rootReducer';
import { updateProfile } from '~/core/store/modules/user/actions';

type Props = BottomTabScreenProps<RootParamList, 'Main'>;

type DashboardState = {
  categories: CategoryType[];
  services: ServiceType[];
};

function Dashboard({ navigation }: Props) {
  const dispatch = useDispatch();
  const [state, setState] = useState<DashboardState>({} as DashboardState);
  const profile = useSelector((rootState: RootState) => rootState.user.profile);

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

    const unsubscribe = navigation.addListener('focus', loadDashboardScreen);

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function loadProfile() {
      const response = await api.get<ProfileType>('profile');

      dispatch(updateProfile({ profile: response.data }));
    }

    const unsubscribe = navigation.addListener('focus', loadProfile);

    return unsubscribe;
  }, []);

  function navigateToCategory(id: number) {
    navigation.navigate('ServiceScreens', {
      screen: 'Service',
      params: { id },
    });
  }

  function navigateToProfessionals(item: ServiceType) {
    navigation.navigate('ServiceScreens', {
      screen: 'ProfessionalsList',
      params: {
        service: item,
      },
    });
  }

  useEffect(() => {
    function verifyAddress() {
      if (profile.id && !profile.address) {
        Alert.alert(
          'Seja bem vindo',
          'Para dar continuidade, precisamos que você insira seu endereço.',
        );

        setTimeout(() => {
          navigation.navigate('PositionScreens', {
            screen: 'SelectPosition',
          });
        }, 100);
      }
    }

    const unsubscribe = navigation.addListener('focus', verifyAddress);

    return unsubscribe;
  }, [profile.id, profile.address]);

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
            <HeaderText>{parseProfileAddress(profile.address)}</HeaderText>
            <MaterialIcons name="keyboard-arrow-down" color="#717171" />
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
        renderItem={({ item: service }) => (
          <ServiceItem data={service} onPress={navigateToProfessionals} />
        )}
      />
    </Container>
  );
}

export default Dashboard;
