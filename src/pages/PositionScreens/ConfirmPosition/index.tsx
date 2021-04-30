import React, { useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form } from '@unform/mobile';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { FormHandles, SubmitHandler } from '@unform/core';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import Input from '~/components/Input';
import Button from '~/components/Button';

import { PositionScreensNavigatorParamList } from '../PositionScreens';
import { RootParamList } from '~/core/routes/app.routes';
import api from '~/core/services/api';

import styles from './styles';
import { updateProfile } from '~/core/store/modules/user/actions';
import { parseNumber } from '~/core/utils/parsers';

type ConfirmRouteProp = RouteProp<
  PositionScreensNavigatorParamList,
  'ConfirmPosition'
>;

type Props = {
  route: ConfirmRouteProp;
  navigation: CompositeNavigationProp<
    StackNavigationProp<PositionScreensNavigatorParamList, 'ConfirmPosition'>,
    StackNavigationProp<RootParamList>
  >;
};

interface ConfirmPositionFormData {
  number: string;
  complement: string;
}

function ConfirmPosition({ navigation, route }: Props) {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();

  const { data, isNew } = route.params;
  const { longitude, latitude } = data.latLng;

  const description = data.description;

  const number = parseNumber(description.name);

  const onSubmit: SubmitHandler<ConfirmPositionFormData> = async (data) => {
    const { complement, number } = data;

    try {
      const callMethod = isNew ? 'post' : 'put';

      const response = await api[callMethod]<ProfileType>('/profile/address', {
        address: {
          streetName: description.street,
          zipCode: description.postalCode,
          latitude,
          longitude,
          number,
          complement,
          neighborhood: description.district,
        },
      });

      dispatch(updateProfile({ profile: response.data }));

      navigation.navigate('Main', {
        screen: 'Home',
      });
    } catch (error) {
      Alert.alert('OOops...', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
          />
        </MapView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{description.street}</Text>
          <Text style={styles.headerSubtitle}>
            {`${description.subregion}, ${description.district}`}
          </Text>
        </View>
        <View>
          <Form
            ref={formRef}
            onSubmit={onSubmit}
            style={styles.form}
            initialData={{
              number,
            }}
          >
            <View style={{ width: 100, marginRight: 16 }}>
              <Text style={styles.formLabel}>Número</Text>
              <Input name="number" placeholder="Número" />
            </View>
            <View style={{ width: 200 }}>
              <Text style={styles.formLabel}>Complemento</Text>
              <Input name="complement" placeholder="Complemento" />
            </View>
          </Form>
        </View>
        <View style={styles.containerButton}>
          <Button
            style={styles.button}
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Salvar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ConfirmPosition;
