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
import { getLocalization } from '../utils/getLocalization';

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
  ] = useState<Location.LocationGeocodedAddress>();

  const [latLng, setLatLng] = useState<Location.LocationObject | null>(null);

  const dispatch = useDispatch();

  const getDeviceLocalization = useCallback(async () => {
    try {
      const { location, geocode } = await getLocalization();

      setLatLng(location);
      setCurrentAddress(geocode[0]);
    } catch (error) {
      Alert.alert('Sem acesso a localização.', error.message);
    }
  }, []);

  useEffect(() => {
    getDeviceLocalization();
  }, [getDeviceLocalization]);

  async function setCurrentLocalization() {
    if (!currentAddress) {
      Alert.prompt(
        'Não encontramos seu endereço.',
        'Você deseja buscar sua localização?',
        [
          {
            text: 'OK',
            onPress: getDeviceLocalization,
          },
          {
            text: 'Cancelar',
          },
        ],
      );
      return;
    }

    const parsedNumber = currentAddress.name?.replace(/\D/g, '') || 0;

    try {
      const payload = {
        address: {
          latitude: latLng!.coords.latitude,
          longitude: latLng!.coords.longitude,
          streetName: currentAddress.street,
          zipCode: currentAddress.postalCode,
          number: Number(parsedNumber),
          neighborhood:
            currentAddress.district || currentAddress.subregion || '',
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
        {profile.address && (
          <HeaderBackButton onPress={() => navigation.goBack()} />
        )}
      </Header>

      <TouchableWithoutFeedback onPress={navigateToFindPosition}>
        <FakeUserInput>
          <FakeUserInputText>Buscar endereço</FakeUserInputText>
        </FakeUserInput>
      </TouchableWithoutFeedback>

      <PositionCards
        icon="navigation"
        title="Usar localização atual"
        subtitle={parseCurrentAddress(currentAddress)}
        onPress={setCurrentLocalization}
        disabled={!currentAddress}
      />

      {profile.address && (
        <PositionCards
          icon="navigation-2"
          title="Casa"
          subtitle={parseProfileAddress(profile.address)}
          onPress={() => navigation.goBack()}
          active
        />
      )}
    </Container>
  );
}

export default SelectPosition;
