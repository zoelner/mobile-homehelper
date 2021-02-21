export interface ServiceType {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryType;
  image: {
    mobile: {
      name: string;
      url: string;
    };
  };
}

export interface CategoryType {
  id: number;
  name: string;
  image: {
    mobile: {
      name: string;
      url: string;
    };
  };
  servicesType: ServiceType[];
}
