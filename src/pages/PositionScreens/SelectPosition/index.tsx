import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, TouchableWithoutFeedback } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';

import { StackNavigatorParamList } from '../../../routes/app.routes';
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

interface NominatinAddress {
  lat: number;
  lon: number;
  address: {
    road: string;
    suburb: string;
    city: string;
  };
}

interface ProfileAddress {
  streetName: string;
  number: string;
  complement: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

type Props = StackScreenProps<StackNavigatorParamList, 'SelectPosition'>;

function SelectPosition({ navigation }: Props) {
  const [currentLocation, setCurrentLocation] = useState<NominatinAddress>(
    {} as NominatinAddress,
  );

  const [profileLocation, setProfileLocation] = useState<ProfileAddress>(
    {} as ProfileAddress,
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(async (info) => {
      const { latitude, longitude } = info.coords;

      const response = await Axios.get<NominatinAddress>(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      );

      setCurrentLocation(response.data);
    });
  }, []);

  useEffect(() => {
    async function getProfileLocalization() {
      const response = await api.get<{ address: ProfileAddress }>('/profile');

      setProfileLocation(response.data.address);
    }

    getProfileLocalization();
  }, []);

  function parseAddress(road: string, suburb: string, city: string) {
    if (!road) return 'Localizando...';
    return `${road},  ${suburb} - ${city}`;
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

      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('FindPosition', {
            latitude: Number(currentLocation.lat),
            longitude: Number(currentLocation.lon),
          });
        }}
      >
        <FakeUserInput>
          <Feather name="search" color="#8A8A8F" size={20} />
          <FakeUserInputText>Buscar endereço</FakeUserInputText>
        </FakeUserInput>
      </TouchableWithoutFeedback>

      <PositionCards
        icon="navigation"
        title="Usar localização atual"
        subtitle={parseAddress(
          currentLocation?.address?.road,
          currentLocation?.address?.suburb,
          currentLocation?.address?.city,
        )}
        onPress={() => navigation.goBack()}
      />

      <PositionCards
        icon="navigation-2"
        title="Casa"
        subtitle={parseAddress(
          profileLocation.streetName,
          profileLocation.number,
          profileLocation.complement,
        )}
        onPress={() => navigation.goBack()}
        active
      />
    </Container>
  );
}

export default SelectPosition;
