import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

const Loader: React.FC = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#0000ff" />
    </Container>
  );
};

export default Loader;
