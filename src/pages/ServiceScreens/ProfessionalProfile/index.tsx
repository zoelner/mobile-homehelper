import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import { RootParamList } from '~/navigations/app.routes';
import ProfileBlank from '~/assets/images/profile.png';

import { ServiceScreensNavigatorParamList } from '~/navigations/app.routes/services.routes';

import {
  Container,
  ProfileImageContainer,
  ProfileImage,
  Title,
  LabelWrapper,
  Label,
  DescriptionContainer,
  Description,
} from './styles';
import { formatDistanceToNow } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import { ptBR } from 'date-fns/locale';

type ProfileRouteProp = RouteProp<
  ServiceScreensNavigatorParamList,
  'ProfessionalProfile'
>;

type Props = {
  route: ProfileRouteProp;
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootParamList, 'ServiceScreens'>,
    StackNavigationProp<RootParamList>
  >;
};

function ProfessionalProfile({ route, navigation }: Props) {
  const professional = route.params;

  const parsedMemberSince = useMemo(
    () =>
      formatDistanceToNow(parseISO(professional.memberSince), {
        locale: ptBR,
      }),

    [professional.memberSince],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ProfileImageContainer>
          <ProfileImage
            source={
              professional.image?.url
                ? { uri: professional.image.url }
                : ProfileBlank
            }
          />
        </ProfileImageContainer>
        <Title>{professional.name}</Title>
        {/* <LabelWrapper> */}
        <LabelWrapper>
          <Feather
            name="map"
            size={14}
            color="#8a8a8f"
            style={{ marginRight: 6 }}
          />
          <Label>{professional.distance.toFixed(2)} Km</Label>
        </LabelWrapper>

        <LabelWrapper>
          <Feather
            name="trending-up"
            size={14}
            color="#8a8a8f"
            style={{ marginRight: 6 }}
          />
          <Label>Parceiro desde {parsedMemberSince} atrás.</Label>
        </LabelWrapper>

        {professional.phoneNumber && (
          <LabelWrapper>
            <Feather
              name="smartphone"
              size={14}
              color="#8a8a8f"
              style={{ marginRight: 6 }}
            />
            <Label>{professional.phoneNumber}</Label>
          </LabelWrapper>
        )}
        {professional.email && (
          <LabelWrapper>
            <Feather
              name="mail"
              size={14}
              color="#8a8a8f"
              style={{ marginRight: 6 }}
            />
            <Label>{professional.email}</Label>
          </LabelWrapper>
        )}

        {/* </LabelWrapper> */}
        <DescriptionContainer>
          <Description>{professional.description}</Description>
        </DescriptionContainer>
      </Container>
    </SafeAreaView>
  );
}

export default ProfessionalProfile;
