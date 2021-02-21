import React from 'react';
import { SafeAreaView } from 'react-native';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';

import { UserProfileType } from '../../PositionScreens/SelectPosition';
import { ServiceScreensNavigatorParamList } from '../ServiceScreens';
import { RootParamList } from '../../../routes/app.routes';

import ProfileBlank from '../../../assets/images/profile.png';

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

export interface ProfessionalProfileType extends UserProfileType {
  descripton: string;
  categories: CategoryType[];
}

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ProfileImageContainer>
          <ProfileImage
            source={
              professional.image?.mobile.url
                ? { uri: professional.image?.mobile.url }
                : ProfileBlank
            }
          />
        </ProfileImageContainer>
        <Title>{professional.name}</Title>
        {/* <LabelWrapper> */}
        <LabelWrapper>
          <Feather
            name="smartphone"
            size={14}
            color="#8a8a8f"
            style={{ marginRight: 6 }}
          />
          <Label>{professional.phoneNumber}</Label>
        </LabelWrapper>
        <LabelWrapper>
          <Feather
            name="mail"
            size={14}
            color="#8a8a8f"
            style={{ marginRight: 6 }}
          />
          <Label>{professional.email}</Label>
        </LabelWrapper>

        {/* </LabelWrapper> */}
        <DescriptionContainer>
          <Description>{professional.descripton}</Description>
        </DescriptionContainer>
      </Container>
    </SafeAreaView>
  );
}

export default ProfessionalProfile;
