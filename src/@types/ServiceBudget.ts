export enum ServiceBudgetStatus {
  WAITING_FOR_BUDGET = 'WAITING_FOR_BUDGET',
  WAITING_FOR_APROVAL = 'WAITING_FOR_APROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REJECTED_BY_PROFESSIONAL = 'REJECTED_BY_PROFESSIONAL',
}

export interface ServiceBudgetType {
  id: number;
  professional: Pick<
    ProfileType,
    'id' | 'name' | 'image' | 'email' | 'phoneNumber'
  >;
  description: string;
  createdAt: string;
  updatedAt: string;
  address: AddressType;
  status: ServiceBudgetStatus;
  serviceType: ServiceType;
  images?: ImageContent[];
  professionalDescription?: string;
  price?: number;
}
