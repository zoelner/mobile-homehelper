import React, { useState } from 'react';
import MapView, { LatLng, MapEvent, Marker } from 'react-native-maps';
import { Dimensions, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Axios from 'axios';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import Button from '../../../components/Button';
import { PositionScreensNavigatorParamList } from '../PositionScreens';
import { MainStackParamList } from '../../../routes/app.routes';

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

type FindRouteProp = RouteProp<
  PositionScreensNavigatorParamList,
  'FindPosition'
>;

type Props = {
  route: FindRouteProp;
  navigation: CompositeNavigationProp<
    StackNavigationProp<PositionScreensNavigatorParamList, 'FindPosition'>,
    StackNavigationProp<MainStackParamList>
  >;
};

function FindPosition({ route, navigation }: Props) {
  const [coordinate, setCoordinate] = useState<LatLng>({
    latitude: Number(route.params.data.lat),
    longitude: Number(route.params.data.lon),
  });

  const [description, setDescription] = useState<NominatinResponse>(
    route.params.data,
  );

  async function getProperties({ latitude, longitude }: LatLng) {
    const response = await Axios.get<NominatinResponse>(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
    );

    setDescription(response.data);
  }

  async function setProperties(event: MapEvent) {
    setCoordinate(event.nativeEvent.coordinate);
    getProperties(event.nativeEvent.coordinate);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: Number(route.params.data.lat),
          longitude: Number(route.params.data.lon),
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
            navigation.navigate('ConfirmPosition', {
              data: description,
              isNew: route.params.isNew,
            });
          }}
        >
          Confirmar
        </Button>
      </View>
    </View>
  );
}

export default FindPosition;
