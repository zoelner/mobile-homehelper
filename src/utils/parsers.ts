export function parseCurrentAddress(
  road: string | undefined,
  suburb: string | undefined,
  city: string | undefined,
) {
  if (!road) return 'Localizando...';
  return `${road},  ${suburb} - ${city}`;
}

export function parseProfileAddress(
  streetName: string | undefined,
  number: string | undefined,
  complement: string | undefined,
) {
  if (!streetName) return 'Carregando...';
  if (!Number(number)) return streetName;

  return `${streetName},  ${number} - ${complement}`;
}
