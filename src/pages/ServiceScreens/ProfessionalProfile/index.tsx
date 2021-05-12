import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import { ptBR } from 'date-fns/locale';

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
  Budget,
} from './styles';

import Button from '~/components/Button';

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
  const { profile, service } = route.params;

  const parsedMemberSince = useMemo(
    () =>
      formatDistanceToNow(parseISO(profile.memberSince), {
        locale: ptBR,
      }),

    [profile.memberSince],
  );

  function navigateToServiceBudget() {
    navigation.navigate('ServiceScreens', {
      screen: 'ServiceBudget',
      params: {
        profile,
        service,
      },
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ProfileImageContainer>
          <ProfileImage
            source={
              profile.image?.url ? { uri: profile.image.url } : ProfileBlank
            }
          />
        </ProfileImageContainer>
        <Title>{profile.name}</Title>
        {/* <LabelWrapper> */}
        <LabelWrapper>
          <Feather
            name="map"
            size={14}
            color="#8a8a8f"
            style={{ marginRight: 6 }}
          />
          <Label>{profile.distance.toFixed(2)} Km</Label>
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

        {profile.phoneNumber && (
          <LabelWrapper>
            <Feather
              name="smartphone"
              size={14}
              color="#8a8a8f"
              style={{ marginRight: 6 }}
            />
            <Label>{profile.phoneNumber}</Label>
          </LabelWrapper>
        )}
        {profile.email && (
          <LabelWrapper>
            <Feather
              name="mail"
              size={14}
              color="#8a8a8f"
              style={{ marginRight: 6 }}
            />
            <Label>{profile.email}</Label>
          </LabelWrapper>
        )}

        {/* </LabelWrapper> */}
        <DescriptionContainer>
          <Description>{profile.description}</Description>
        </DescriptionContainer>

        <Budget>
          <Button onPress={navigateToServiceBudget}>Solitar orçamento</Button>
        </Budget>
      </Container>
    </SafeAreaView>
  );
}

export default ProfessionalProfile;
