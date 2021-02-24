import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Container, Image, ServiceText } from './styles';

export interface ServiceItemProps {
  data: ServiceType;
  onPress(item: ServiceType): void;
}

function ServiceItem({ data, onPress }: ServiceItemProps) {
  return (
    <TouchableWithoutFeedback onPress={() => onPress(data)}>
      <Container>
        <Image source={{ uri: data.image.mobile.url }} />

        <ServiceText>{data.name}</ServiceText>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default ServiceItem;
