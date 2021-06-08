import * as Location from 'expo-location';

export async function getLocalization() {
  const {
    status,
    ...rest
  } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error(
      'Precisamos acessar a sua localização, sem ela não podemos continuar',
    );
  }

  const location = await Location.getCurrentPositionAsync({});
  const geocode = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  return { location, geocode };
}
