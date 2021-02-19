import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ServiceType } from '../ServiceItem';

import { Container, Image, CategoryText } from './styles';

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

export interface CategoryItemProps {
  data: CategoryType;
  onPress(id: number): void;
}

function CategoryItem({ data, onPress }: CategoryItemProps) {
  return (
    <TouchableWithoutFeedback onPress={() => onPress(data.id)}>
      <Container>
        <Image source={{ uri: data.image.mobile.url }} />

        <CategoryText>{data.name}</CategoryText>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export default CategoryItem;
