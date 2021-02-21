import React, { useCallback, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, Image, TouchableWithoutFeedback } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

import { RootParamList } from '~/core/routes/app.routes';
import BackgroundPositionFirstStep from '~/assets/images/background-localization-first-step.png';

import {
  Container,
  Header,
  HeaderBackButton,
  FakeUserInput,
  FakeUserInputText,
} from './styles';
import PositionCards from './PositionCards';
import api from '~/core/services/api';
import { PositionScreensNavigatorParamList } from '../PositionScreens';
import { parseCurrentAddress, parseProfileAddress } from '~/core/utils/parsers';
import { NominatinResponse } from '../FindPosition';
import { updateProfile } from '~/core/store/modules/user/actions';
import { RootState } from '~/core/store/modules/rootReducer';

type PositionsRouteProp = RouteProp<
  PositionScreensNavigatorParamList,
  'SelectPosition'
>;

type PositionsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PositionScreensNavigatorParamList, 'SelectPosition'>,
  StackNavigationProp<RootParamList>
>;

type Props = {
  route: PositionsRouteProp;
  navigation: PositionsScreenNavigationProp;
};

function SelectPosition({ navigation, route }: Props) {
  const profile = useSelector((state: RootState) => state.user.profile);

  const [
    currentLocation,
    setCurrentLocation,
  ] = useState<NominatinResponse | null>(null);

  const dispatch = useDispatch();

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
  }, [getDeviceLocalization]);

  async function setCurrentLocalization() {
    if (!currentLocation) return;

    try {
      const payload = {
        address: {
          streetName: currentLocation.address.road,
          zipCode: currentLocation.address.postcode,
          latitude: currentLocation.lat,
          longitude: currentLocation.lon,
          number: 0,
        },
      };

      const callMethod = profile?.address ? 'put' : 'post';

      const response = await api[callMethod]<ProfileType>(
        '/profile/address',
        payload,
      );

      dispatch(updateProfile({ profile: response.data }));

      navigation.navigate('Main', { screen: 'Home' });
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
      isNew: !profile?.address,
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
        subtitle={parseProfileAddress(profile.address)}
        onPress={() => navigation.goBack()}
        active
      />
    </Container>
  );
}

export default SelectPosition;
