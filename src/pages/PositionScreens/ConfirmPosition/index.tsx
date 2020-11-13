import { StackScreenProps } from '@react-navigation/stack';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FormHandles } from '@unform/core';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { StackNavigatorParamList } from '../../../routes/app.routes';

type Props = StackScreenProps<StackNavigatorParamList, 'ConfirmPosition'>;

interface ConfirmPositionFormData {
  streetName: string;
  complement: string;
}

function ConfirmPosition({ route, navigation }: Props) {
  const formRef = useRef<FormHandles>(null);

  const { address, lon, lat } = route.params;

  const onSubmit = useCallback(
    async (data: ConfirmPositionFormData) => {
      try {
        console.log('OnSubmit');
      } catch (error) {
        Alert.alert('OOops...', error.message);
      }
    },
    [navigation.navigate],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: Number(lat),
            longitude: Number(lon),
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
        >
          <Marker
            coordinate={{
              latitude: Number(lat),
              longitude: Number(lon),
            }}
          />
        </MapView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{address.road}</Text>
          <Text
            style={styles.headerSubtitle}
          >{`${address.suburb},${address.city}, ${address.state}`}</Text>
        </View>
        <View>
          <Form ref={formRef} onSubmit={onSubmit} style={styles.form}>
            <View style={{ width: 100, marginRight: 16 }}>
              <Text style={styles.formLabel}>Número</Text>
              <Input name="streetName" placeholder="Número" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    marginTop: 32,
    marginBottom: 56,
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    color: '#555555',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 80,
  },
  form: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    paddingLeft: 16,
    paddingRight: 16,
  },
  formLabel: {
    marginBottom: 8,
    paddingLeft: 4,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 64,
  },
  button: {
    width: '100%',
  },
});

export default ConfirmPosition;
