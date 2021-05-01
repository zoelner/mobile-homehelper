import React, { useCallback, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, Image, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import * as Location from 'expo-location';

import { RootParamList } from '~/navigations/app.routes';
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
import { PositionScreensNavigatorParamList } from '~/navigations/app.routes/positions.routes';
import { parseCurrentAddress, parseProfileAddress } from '~/core/utils/parsers';
import { updateProfile } from '~/core/store/modules/user/actions';
import { RootState } from '~/core/store/modules/rootReducer';
import { LocationGeocodedAddress, LocationObject } from 'expo-location';

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
    currentAddress,
    setCurrentAddress,
  ] = useState<LocationGeocodedAddress | null>(null);

  const [latLng, setLatLng] = useState<LocationObject | null>(null);

  const dispatch = useDispatch();

  const getDeviceLocalization = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Sem acesso a localização.',
        'Precisamos acessar a sua localização, sem ela não podemos continuar',
      );
      navigation.goBack();
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let geocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    setLatLng(location);
    setCurrentAddress(geocode[0]);
  }, []);

  useEffect(() => {
    getDeviceLocalization();
  }, [getDeviceLocalization]);

  async function setCurrentLocalization() {
    if (!currentAddress) return;

    try {
      const payload = {
        address: {
          latitude: latLng!.coords.latitude,
          longitude: latLng!.coords.longitude,
          streetName: currentAddress.street,
          zipCode: currentAddress.postalCode,
          number: currentAddress.name || 0,
          neighborhood: currentAddress.subregion || '',
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
    if (!latLng?.coords || !currentAddress) return;
    navigation.navigate('FindPosition', {
      data: {
        latLng: latLng.coords,
        description: currentAddress,
      },
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
        subtitle={parseCurrentAddress(currentAddress || undefined)}
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
