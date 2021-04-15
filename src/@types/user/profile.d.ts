type ProfileType = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  description?: string;
  services: ServiceType[];
  address?: AddressType;
  image?: ImageContent;
};

interface ProfessionalProfileType extends ProfileType {
  categories: CategoryType[];
}
