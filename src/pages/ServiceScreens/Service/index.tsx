import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { differenceInDays, parseISO } from 'date-fns';

import api from '~/core/services/api';
import { RootParamList } from '~/navigations/app.routes';

import { ServiceScreensNavigatorParamList } from '../../../navigations/app.routes/services.routes';

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
              service.createdAt &&
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

  function navigateToProfessionals(item: ServiceType) {
    navigation.navigate('ServiceScreens', {
      screen: 'ProfessionalsList',
      params: {
        id: item.id,
        serviceName: item.name,
      },
    });
  }

  return (
    <Container>
      <ServiceList
        data={services}
        keyExtractor={(service) => String(service.id)}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigateToProfessionals(item)}
            >
              <ServiceItem>
                <ServiceItemImage source={{ uri: item.image.mobile.url }} />
                <ServiceItemBoxText>
                  <ServiceItemText>{item.name}</ServiceItemText>
                  <ServiceItemWarning>{item.status}</ServiceItemWarning>
                </ServiceItemBoxText>
              </ServiceItem>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </Container>
  );
}

export default Service;
