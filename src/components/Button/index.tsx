import React from 'react';

import { Container, Text } from './styles';
import { RectButtonProperties } from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <Text>{children}</Text>
    </Container>
  );
};

export default Button;
