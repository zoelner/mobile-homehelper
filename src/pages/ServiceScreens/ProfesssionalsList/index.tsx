import React, { useEffect, useState } from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native';

import { RootParamList } from '~/core/routes/app.routes';
import api from '~/core/services/api';
import ProfileBlank from '~/assets/images/profile.png';

import { ServiceScreensNavigatorParamList } from '../ServiceScreens';
import { ProfessionalProfileType } from '../ProfessionalProfile';

import {
  Container,
  ProfessionalList,
  ProfessionalItem,
  ProfessionalItemImage,
  ProfessionalItemBoxText,
  ProfessionalItemText,
  ProfessionalItemDescription,
} from './styles';

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

  useEffect(() => {
    async function loadProfessionals() {
      const params = new URLSearchParams();
      params.append('serviceTypeID', String(route.params.id));
      params.append('distance', '15');
      params.append('latitude', '-25.514685');
      params.append('longitude', '-49.326704');

      const response = await api.get<{ professionals: ProfessionalListType[] }>(
        '/professionals',
        {
          params,
        },
      );

      setProfessionals(response.data.professionals);
    }

    loadProfessionals();
  }, [route.params.id]);

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
                  params: item,
                });
              }}
            >
              <ProfessionalItem>
                <ProfessionalItemImage
                  source={
                    item.image?.mobile.url
                      ? { uri: item.image?.mobile.url }
                      : ProfileBlank
                  }
                />
                <ProfessionalItemBoxText>
                  <ProfessionalItemText>{item.name}</ProfessionalItemText>
                  <ProfessionalItemDescription
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {item.descripton}
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
