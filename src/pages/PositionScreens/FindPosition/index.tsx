import React, { useRef, useState } from 'react';
import MapView, { LatLng, MapEvent, Marker } from 'react-native-maps';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Location from 'expo-location';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

import Button from '~/components/Button';
import { RootParamList } from '~/navigations/app.routes';

import { PositionScreensNavigatorParamList } from '~/navigations/app.routes/positions.routes';
import { LocationGeocodedAddress, LocationObject } from 'expo-location';
import { parseCurrentAddress } from '~/core/utils/parsers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  containerText: {
    position: 'absolute',
    top: '8%',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 24,
    fontWeight: 'bold',
  },

  containerButton: {
    position: 'absolute',
    bottom: '8%',
    width: '50%',
  },
});

export type NominatinResponse = {
  latLng: Pick<LocationObject['coords'], 'latitude' | 'longitude'>;
  description: LocationGeocodedAddress;
};

type FindRouteProp = RouteProp<
  PositionScreensNavigatorParamList,
  'FindPosition'
>;

type Props = {
  route: FindRouteProp;
  navigation: CompositeNavigationProp<
    StackNavigationProp<PositionScreensNavigatorParamList, 'FindPosition'>,
    StackNavigationProp<RootParamList>
  >;
};

function FindPosition({ route, navigation }: Props) {
  const markerRef = useRef<Marker>(null);

  const [coordinate, setCoordinate] = useState<LatLng>(() =>
    getCordinate(route.params.data.latLng),
  );

  const [description, setDescription] = useState<LocationGeocodedAddress>(
    route.params.data.description,
  );

  function getCordinate(
    data: LatLng | Pick<LocationObject['coords'], 'latitude' | 'longitude'>,
  ) {
    let { latitude, longitude } = data;

    const lat = Number(latitude);
    const lon = Number(longitude);

    return { latitude: lat, longitude: lon };
  }

  async function getProperties(
    data: LatLng | Pick<LocationObject['coords'], 'latitude' | 'longitude'>,
  ) {
    const { latitude, longitude } = getCordinate(data);

    const geocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    return geocode[0];
  }

  async function setProperties(event: MapEvent) {
    setCoordinate(event.nativeEvent.coordinate);
    setDescription(await getProperties(event.nativeEvent.coordinate));
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: Number(route.params.data.latLng.latitude),
          longitude: Number(route.params.data.latLng.longitude),
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          draggable
          coordinate={coordinate}
          onDragEnd={setProperties}
          ref={markerRef}
        />
      </MapView>
      <View style={styles.containerText}>
        <Text>{parseCurrentAddress(description)}</Text>
      </View>
      <View style={styles.containerButton}>
        <Button
          onPress={() => {
            navigation.navigate('ConfirmPosition', {
              data: {
                latLng: coordinate,
                description,
              },
              isNew: route.params.isNew,
            });
          }}
        >
          Confirmar
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default FindPosition;
