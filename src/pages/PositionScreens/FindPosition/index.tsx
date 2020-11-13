import React, { useState } from 'react';
import MapView, { LatLng, MapEvent, Marker } from 'react-native-maps';
import { Dimensions, StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Axios from 'axios';

import Button from '../../../components/Button';
import { StackNavigatorParamList } from '../../../routes/app.routes';

export interface NominatinResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    road: string;
    suburb: string;
    city: string;
    municipality: string;
    county: string;
    state_district: string;
    state: string;
    region: string;
    postcode: number;
    country: string;
    country_code: string;
  };
}

type Props = StackScreenProps<StackNavigatorParamList, 'FindPosition'>;

function FindPosition({ route, navigation }: Props) {
  const [coordinate, setCoordinate] = useState<LatLng>(route.params);
  const [description, setDescription] = useState<NominatinResponse>(
    () => (getProperties(route.params) as unknown) as NominatinResponse,
  );

  async function getProperties({
    latitude,
    longitude,
  }: LatLng): Promise<NominatinResponse> {
    const response = await Axios.get<NominatinResponse>(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
    );

    setDescription(response.data);
    return response.data;
  }

  async function setProperties(event: MapEvent) {
    const { coordinate } = event.nativeEvent;

    setCoordinate(coordinate);
    getProperties(coordinate);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          ...route.params,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          draggable
          coordinate={coordinate}
          title={description?.address?.road}
          description={description?.address?.city}
          onDragEnd={setProperties}
        />
      </MapView>
      <View style={styles.containerButton}>
        <Button
          onPress={() => {
            navigation.navigate('ConfirmPosition', description);
          }}
        >
          Confirmar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  containerButton: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '8%',
    width: Dimensions.get('window').width,
  },
});

export default FindPosition;
