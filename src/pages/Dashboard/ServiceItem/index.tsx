import React from 'react';

import { Container, Image, ServiceText } from './styles';
import { ServiceType } from '../interfaces';

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
