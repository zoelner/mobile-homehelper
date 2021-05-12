import React, { useEffect, useState } from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';

import { RootParamList } from '~/navigations/app.routes';
import api from '~/core/services/api';
import ProfileBlank from '~/assets/images/profile.png';

import { ServiceScreensNavigatorParamList } from '../../../navigations/app.routes/services.routes';

import {
  Container,
  ProfessionalList,
  ProfessionalItem,
  ProfessionalItemImage,
  ProfessionalItemBoxText,
  ProfessionalItemText,
  ProfessionalItemDescription,
} from './styles';
import { RootState } from '~/core/store/modules/rootReducer';

type ProfileRouteProp = RouteProp<
  ServiceScreensNavigatorParamList,
  'ProfessionalsList'
>;

type Props = {
  route: ProfileRouteProp;
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootParamList, 'ServiceScreens'>,
    StackNavigationProp<RootParamList>
  >;
};

export type ProfessionalListType = ProfessionalProfileType;

function ProfesssionalsList({ route, navigation }: Props) {
  const [professionals, setProfessionals] = useState<ProfessionalListType[]>(
    [],
  );

  const latitude = useSelector(
    (state: RootState) => state.user.profile.address?.latitude,
  );
  const longitude = useSelector(
    (state: RootState) => state.user.profile.address?.longitude,
  );

  useEffect(() => {
    async function loadProfessionals() {
      if (!latitude || !longitude) return;

      const params = new URLSearchParams();
      params.append('serviceTypeID', String(route.params.service.id));
      params.append('distance', '15');
      params.append('latitude', String(latitude));
      params.append('longitude', String(longitude));

      const response = await api.get<{ professionals: ProfessionalListType[] }>(
        '/professionals',
        { params },
      );

      setProfessionals(response.data.professionals);
    }

    loadProfessionals();
  }, [route.params.service.id, latitude, longitude]);

  return (
    <Container>
      <ProfessionalList
        data={professionals}
        keyExtractor={(professional) => String(professional.id)}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('ServiceScreens', {
                  screen: 'ProfessionalProfile',
                  params: {
                    service: route.params.service,
                    profile: item,
                  },
                });
              }}
            >
              <ProfessionalItem>
                <ProfessionalItemImage
                  source={
                    item.image?.url ? { uri: item.image?.url } : ProfileBlank
                  }
                />
                <ProfessionalItemBoxText>
                  <ProfessionalItemText>{item.name}</ProfessionalItemText>
                  <ProfessionalItemDescription
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.description}
                  </ProfessionalItemDescription>
                </ProfessionalItemBoxText>
              </ProfessionalItem>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </Container>
  );
}

export default ProfesssionalsList;
