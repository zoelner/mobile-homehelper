import React, { useEffect, useState } from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import api from '../../services/api';
import { MainParamList, RootParamList } from '../../routes/app.routes';

import { ServiceScreensNavigatorParamList } from '../ServiceScreens';

import { ServiceType } from '../Dashboard/ServiceItem';

type CategoryRouteProp = RouteProp<
  ServiceScreensNavigatorParamList,
  'Category'
>;

type Props = {
  route: CategoryRouteProp;
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootParamList, 'ServiceScreens'>,
    StackNavigationProp<RootParamList>
  >;
};

function Category({ route, navigation }: Props) {
  const [services, setServices] = useState<ServiceType[]>([]);
  const { id } = route.params;

  useEffect(() => {
    async function loadServices() {
      const response = await api.get<ServiceType[]>(
        `/servicetype/category/${id}`,
      );

      setServices(response.data);
    }
    loadServices();
  }, [id]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={services}
        keyExtractor={(service) => String(service.id)}
        renderItem={({ item }) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </SafeAreaView>
  );
}

export default Category;
