import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import api from '../../services/api';
import Loader from '../../components/Loader';

import { StackNavigatorParamList } from '../../routes/app.routes';

import {
  Container,
  Header,
  HeaderText,
  HeaderButton,
  HeaderButtonContent,
  CategoryList,
  CategoryItem,
  CategoryText,
} from './styles';

export interface Category {
  id: number;
  name: string;
}

type Props = BottomTabScreenProps<StackNavigatorParamList, 'Home'>;

function Dashboard({ navigation }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await api.get<Category[]>('category');
        setCategories(response.data);
      } catch (error) {
        Alert.alert('Não foi possivel obter as categorias.');
      }
    }

    getCategories();
  }, []);

  if (!categories.length) {
    return <Loader />;
  }

  return (
    <Container>
      <Header>
        <HeaderButton onPress={() => navigation.navigate('SelectPosition')}>
          <HeaderButtonContent>
            <HeaderText> R. Rio São Francisco</HeaderText>
            <Icon name="keyboard-arrow-down" color="#717171" />
          </HeaderButtonContent>
        </HeaderButton>
      </Header>

      <CategoryList
        data={categories}
        keyExtractor={(category) => String(category.id)}
        renderItem={({ item: category }) => (
          <CategoryItem>
            <CategoryText>{category.name}</CategoryText>
          </CategoryItem>
        )}
      />
    </Container>
  );
}

export default Dashboard;
