import React, { useEffect, useState } from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { differenceInDays, parseISO } from 'date-fns';

import api from '../../services/api';
import { RootParamList } from '../../routes/app.routes';

import { ServiceScreensNavigatorParamList } from '../ServiceScreens';

import { ServiceType } from '../Dashboard/ServiceItem';
import {
  Container,
  ServiceList,
  ServiceItem,
  ServiceItemImage,
  ServiceItemBoxText,
  ServiceItemText,
  ServiceItemWarning,
} from './styles';

type ServiceRouteProp = RouteProp<ServiceScreensNavigatorParamList, 'Service'>;

type Props = {
  route: ServiceRouteProp;
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootParamList, 'ServiceScreens'>,
    StackNavigationProp<RootParamList>
  >;
};

export type ServiceTypeParsed = ServiceType & {
  status: 'Novo' | 'Consolidado';
};

function Service({ route, navigation }: Props) {
  const [services, setServices] = useState<ServiceTypeParsed[]>([]);
  const { id } = route.params;

  useEffect(() => {
    async function loadServices() {
      const response = await api.get<ServiceType[]>(
        `/servicetype/category/${id}`,
      );

      const parsedServices: ServiceTypeParsed[] = response.data.map(
        (service) => {
          return {
            ...service,
            status:
              differenceInDays(new Date(), parseISO(service.createdAt)) < 30
                ? 'Novo'
                : 'Consolidado',
          };
        },
      );

      setServices(parsedServices);
    }
    loadServices();
  }, [id]);

  return (
    <Container>
      <ServiceList
        data={services}
        keyExtractor={(service) => String(service.id)}
        renderItem={({ item }) => {
          return (
            <ServiceItem>
              <ServiceItemImage source={{ uri: item.image.mobile.url }} />
              <ServiceItemBoxText>
                <ServiceItemText>{item.name}</ServiceItemText>
                <ServiceItemWarning>{item.status}</ServiceItemWarning>
              </ServiceItemBoxText>
            </ServiceItem>
          );
        }}
      />
    </Container>
  );
}

export default Service;