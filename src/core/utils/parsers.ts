import { LocationGeocodedAddress } from 'expo-location';

export function parseNumber(number: string | null) {
  if (!number) return;

  const value = number.match(/\d+/);

  if (value) {
    return value[0];
  }

  return;
}

export function parseCurrentAddress(
  { street, name }: LocationGeocodedAddress = {} as LocationGeocodedAddress,
): string {
  if (!street && name) return name;
  if (street && name) {
    const separateRoadAndName = name.split(',');

    if (separateRoadAndName.length > 1) {
      return name;
    }

    return `${street}, ${name}`;
  }
  if (street) return street;

  return 'Buscando...';
}

export function parseProfileAddress(
  data: AddressType = {} as AddressType,
): string {
  if (data.streetName && !Number(data.number)) return data.streetName;
  else if (data.streetName && data.number && data.complement)
    return `${data.streetName},  ${data.number} - ${data.complement}`;
  else if (data.streetName && data.number)
    return `${data.streetName},  ${data.number}`;

  return 'Desconhecido';
}
