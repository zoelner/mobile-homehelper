export enum ServiceBudgetStatus {
  WAITING_FOR_BUDGET = 'WAITING_FOR_BUDGET',
  WAITING_FOR_APROVAL = 'WAITING_FOR_APROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface ServiceBudgetType {
  id: number;
  professional: Pick<ProfileType, 'id' | 'name' | 'image'>;
  description: string;
  createdAt: string;
  updatedAt: string;
  address: AddressType;
  status: ServiceBudgetStatus;
  serviceType: ServiceType;
}
