type ProfileType = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  descripton?: string;
  services: ServiceType[];
  address?: AddressType;
  image?: ImageType;
};
