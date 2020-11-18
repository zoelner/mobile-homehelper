import React, { useCallback, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, Image, TouchableWithoutFeedback } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';

import { MainStackParamList } from '../../../routes/app.routes';
import BackgroundPositionFirstStep from '../../../assets/images/background-localization-first-step.png';

import {
  Container,
  Header,
  HeaderBackButton,
  FakeUserInput,
  FakeUserInputText,
} from './styles';
import PositionCards from './PositionCards';
import api from '../../../services/api';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { PositionScreensNavigatorParamList } from '../PositionScreens';
import {
  parseCurrentAddress,
  parseProfileAddress,
} from '../../../utils/parsers';
import { NominatinResponse } from '../FindPosition';

interface Profile {
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  address: {
    streetName: string;
    number: string;
    complement: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
}

type PositionsRouteProp = RouteProp<
  PositionScreensNavigatorParamList,
  'SelectPosition'
>;

type PositionsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PositionScreensNavigatorParamList, 'SelectPosition'>,
  StackNavigationProp<MainStackParamList>
>;

type Props = {
  route: PositionsRouteProp;
  navigation: PositionsScreenNavigationProp;
};

function SelectPosition({ navigation }: Props) {
  const [
    currentLocation,
    setCurrentLocation,
  ] = useState<NominatinResponse | null>(null);

  const [profileLocation, setProfileLocation] = useState<Profile | null>(null);

  const getDeviceLocalization = useCallback(() => {
    Geolocation.getCurrentPosition(
      async (info) => {
        const { latitude, longitude } = info.coords;

        const response = await Axios.get<NominatinResponse>(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        );

        setCurrentLocation(response.data);
      },
      () => Geolocation.requestAuthorization(),
    );
  }, [setCurrentLocation]);

  useEffect(() => {
    getDeviceLocalization();
  }, []);

  useEffect(() => {
    async function getProfileLocalization() {
      const response = await api.get<Profile>('/profile');

      setProfileLocation(response.data);
    }

    getProfileLocalization();
  }, []);

  async function setCurrentLocalization() {
    try {
      const payload = {
        address: {
          streetName: currentLocation?.address.road,
          zipCode: currentLocation?.address.postcode,
          latitude: currentLocation?.lat,
          longitude: currentLocation?.lon,
          number: 0,
        },
      };

      const callMethod = profileLocation ? 'put' : 'post';

      const response = await api[callMethod]<Profile>('/profile', payload);

      setProfileLocation(response.data);

      navigation.navigate('Home', { screen: 'Home' });
    } catch (e) {
      Alert.alert(
        'Ocorreu algum erro',
        'Não conseguimos cadastrar sua posição, quer tentar novamente?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: getDeviceLocalization },
        ],
      );
    }
  }

  function navigateToFindPosition() {
    if (!currentLocation) return;
    navigation.navigate('FindPosition', {
      data: currentLocation,
      isNew: !profileLocation,
    });
  }

  return (
    <Container>
      <Header>
        <Image
          style={{ width: 375, height: 248 }}
          source={BackgroundPositionFirstStep}
        />
        <HeaderBackButton onPress={() => navigation.goBack()} />
      </Header>

      <TouchableWithoutFeedback onPress={navigateToFindPosition}>
        <FakeUserInput>
          <FakeUserInputText>Buscar endereço</FakeUserInputText>
        </FakeUserInput>
      </TouchableWithoutFeedback>

      <PositionCards
        icon="navigation"
        title="Usar localização atual"
        subtitle={parseCurrentAddress(
          currentLocation?.address.road,
          currentLocation?.address.suburb,
          currentLocation?.address.city,
        )}
        onPress={setCurrentLocalization}
      />

      <PositionCards
        icon="navigation-2"
        title="Casa"
        subtitle={parseProfileAddress(
          profileLocation?.address.streetName,
          profileLocation?.address.number,
          profileLocation?.address.complement,
        )}
        onPress={() => navigation.goBack()}
        active
      />
    </Container>
  );
}

export default SelectPosition;
