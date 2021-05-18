import { LocationGeocodedAddress } from 'expo-location';
import { ServiceBudgetStatus } from '~/@types/ServiceBudget';

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

export function parserStatus(status: ServiceBudgetStatus) {
  const options: Record<ServiceBudgetStatus, string> = {
    [ServiceBudgetStatus.APPROVED]: 'Aprovado',
    [ServiceBudgetStatus.REJECTED]: 'Rejeitado',
    [ServiceBudgetStatus.REJECTED_BY_PROFESSIONAL]:
      'Rejeitado pelo Profissional',
    [ServiceBudgetStatus.WAITING_FOR_APROVAL]: 'Aguardando Aprovação',
    [ServiceBudgetStatus.WAITING_FOR_BUDGET]: 'Aguardando Orçamento',
  };

  return options[status];
}

export function parserStatusColor(status: ServiceBudgetStatus) {
  const options: Record<ServiceBudgetStatus, string> = {
    [ServiceBudgetStatus.APPROVED]: '#12A454',
    [ServiceBudgetStatus.REJECTED]: '#E83F5B',
    [ServiceBudgetStatus.REJECTED_BY_PROFESSIONAL]: '#E83F5B',
    [ServiceBudgetStatus.WAITING_FOR_APROVAL]: '#516ED4',
    [ServiceBudgetStatus.WAITING_FOR_BUDGET]: '#516ED4',
  };

  return options[status];
}
