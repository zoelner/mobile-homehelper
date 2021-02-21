export function parseCurrentAddress(
  road: string | undefined,
  suburb: string | undefined,
  city: string | undefined,
): string {
  if (!road) return 'Localizando...';
  return `${road},  ${suburb} - ${city}`;
}

export function parseProfileAddress(
  data: AddressType = {} as AddressType,
): string {
  if (!data.streetName) return 'Desconhecido';
  if (data.number && !Number(data.number)) return data.streetName;

  return `${data.streetName},  ${data.number} - ${data.complement}`;
}
