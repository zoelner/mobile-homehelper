import React from 'react';

import { CategoryType } from '../CategoryItem';

import { Container, Image, ServiceText } from './styles';

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

export interface ServiceItemProps {
  data: ServiceType;
}

function ServiceItem({ data }: ServiceItemProps) {
  return (
    <Container>
      <Image source={{ uri: data.image.mobile.url }} />

      <ServiceText>{data.name}</ServiceText>
    </Container>
  );
}

export default ServiceItem;
